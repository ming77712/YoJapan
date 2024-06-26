<script setup>
import { ref, watch, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

const props = defineProps(['currentProduct', 'isNew']);

const modal = ref(null);
const productModal = ref(null);

const tempProduct = ref({ imagesUrl: [] });
const formData = ref(null);

const emits = defineEmits(['refreshProducts', 'productInstance']);

const addProduct = () => {
  if (tempProduct.value.imagesUrl.length === 0) tempProduct.value.imagesUrl.push('');
  axios
    .post(`${VITE_URL}/api/${VITE_PATH}/admin/product`, {
      data: tempProduct.value,
    })
    .then((res) => {
      store.setSweetMessageSuccess(res.data.message);
      Swal.fire(store.sweetMessage);
      setTimeout(() => {
        productModal.value.hide();
        emits('refreshProducts');
      }, 1500);
    })
    .catch((err) => {
      store.setSweetMessageError(err.data.message);
      Swal.fire(store.sweetMessage);
    });
};

const editProduct = () => {
  if (tempProduct.value.imagesUrl.length === 0) tempProduct.value.imagesUrl.push('');
  axios
    .put(
      `${VITE_URL}/api/${VITE_PATH}/admin/product/${tempProduct.value.id}`,
      {
        data: tempProduct.value,
      },
    )
    .then((res) => {
      store.setSweetMessageSuccess(res.data.message);
      Swal.fire(store.sweetMessage);
      setTimeout(() => {
        productModal.value.hide();
        emits('refreshProducts');
      }, 1500);
    })
    .catch((err) => {
      store.setSweetMessageError(err.data.message);
      Swal.fire(store.sweetMessage);
    });
};

const uploadImg = (e) => {
  formData.value = new FormData();
  formData.value.append('file-to-upload', e.target.files[0]);
  if (typeof formData.value !== 'object') return;
  axios
    .post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData.value)
    .then((res) => {
      tempProduct.value.imageUrl = res.data.imageUrl;
    })
    .catch((err) => {
      store.setSweetMessageError(err.message);
      Swal.fire(store.sweetMessage);
    });
};

watch(
  () => props.currentProduct,
  () => {
    tempProduct.value = props.currentProduct;
  },
);

onMounted(() => {
  productModal.value = new Modal(modal.value, {
    keyboard: false,
    backdrop: 'static',
  });
  emits('productInstance', productModal.value);
  tempProduct.value = props.currentProduct;
});

</script>

<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5
            id="productModalLabel"
            class="modal-title"
          >
            <span v-if="props.isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row mb-4">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label
                    for="imageUrl"
                    class="form-label"
                  >輸入圖片網址</label>
                  <input
                    id="imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <div class="mb-3">
                  <label
                    for="upload"
                    class="form-label"
                  >或 上傳圖片</label>
                  <input
                    id="upload"
                    type="file"
                    name="file-to-upload"
                    @change="uploadImg"
                  />
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  v-if="tempProduct.imageUrl"
                  alt="主圖"
                />
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label
                  for="title"
                  class="form-label"
                >標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label
                    for="category"
                    class="form-label"
                  >分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label
                    for="location"
                    class="form-label"
                  >位置</label>
                  <input
                    id="location"
                    type="text"
                    class="form-control"
                    placeholder="請輸入位置"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>
              <div class="row">
                <div class="mb-3 col-md-6">
                  <label
                    for="origin_price"
                    class="form-label"
                  >原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label
                    for="price"
                    class="form-label"
                  >售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />
              <div class="mb-3">
                <label
                  for="description"
                  class="form-label"
                >產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label
                  for="content"
                  class="form-label"
                >說明內容</label>
                <textarea
                  id="content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label
                    class="form-check-label"
                    for="is_enabled"
                  >是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <h4 class="mb-2">多圖新增</h4>
          <template v-if="tempProduct.imagesUrl">
            <div class="row mb-2">
              <div
                class="col-6 mb-1"
                v-for="(image, index) in tempProduct.imagesUrl"
                :key="index"
              >
                <div class="mb-3">
                  <label
                    :for="'images' + index"
                    class="form-label"
                  >圖片網址</label>
                  <input
                    :id="'images' + index"
                    v-model="tempProduct.imagesUrl[index]"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <img
                  class="images"
                  :src="image"
                  alt="附圖"
                />
              </div>
            </div>
            <template v-if="!tempProduct.imagesUrl.length ||
              tempProduct.imagesUrl.length < 5
              ">
              <button
                class="btn btn-outline-primary btn-sm d-block w-100 mb-3"
                @click="tempProduct.imagesUrl.push('')"
              >
                新增圖片
              </button>
            </template>
            <template v-if="tempProduct.imagesUrl.length">
              <button
                class="btn btn-outline-danger btn-sm d-block w-100"
                @click="tempProduct.imagesUrl.pop()"
              >
                刪除圖片
              </button>
            </template>
          </template>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-if="isNew"
            @click="addProduct"
          >
            確認
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-else
            @click="editProduct"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
