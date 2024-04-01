<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import sweetMessageStore from '@/stores/sweetMessageStore';
import ProductAdminModal from '@/components/admin/ProductAdminModal.vue';
import ProductDeleteModal from '@/components/admin/ProductDelModal.vue';
import Pagination from '@/components/PaginationComponent.vue';
import UploadImgModal from '@/components/admin/UploadImgModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      productModal: null,
      delProductModal: null,
      uploadImgModal: null,
      currentProduct: {
        imagesUrl: [],
      },
      products: [],
      pagination: {},
      currentPage: 1,
      isNew: false,
    };
  },
  methods: {
    ...mapActions(sweetMessageStore, ['setSweetMessageSuccess', 'setSweetMessageError']),
    getAllProduct(page = 1) {
      this.currentPage = page;
      axios
        .get(
          `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`,
        )
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          this.setSweetMessageError(err.data.message);
          Swal.fire(this.sweetMessage);
        });
    },
    getProductModal(productModel) {
      this.productModal = productModel;
    },
    getProductDeleteModal(productDeleteModel) {
      this.delProductModal = productDeleteModel;
    },
    getUploadImgModal(uploadImgModel) {
      this.uploadImgModal = uploadImgModel;
    },
    refreshProducts() {
      this.getAllProduct(this.currentPage);
    },
    openModal(modalName, item) {
      if (modalName === 'productModal') {
        this.currentProduct = { imagesUrl: [] };
        this.isNew = true;
        this.productModal.show();
      } else if (modalName === 'editModal') {
        this.currentProduct = { ...item };
        this.isNew = false;
        this.productModal.show();
      } else if (modalName === 'delProductModal') {
        this.currentProduct = item;
        this.delProductModal.show();
      } else if (modalName === 'uploadImgModal') {
        this.uploadImgModal.show();
      }
    },
  },
  mounted() {
    this.getAllProduct();
  },
  computed: {
    ...mapState(sweetMessageStore, ['sweetMessage']),
  },
  components: {
    ProductAdminModal,
    ProductDeleteModal,
    Pagination,
    UploadImgModal,
  },
};
</script>

<template>
  <h3 class="mt-4">行程管理</h3>
  <div class="text-end mt-4">
    <button
      @click="openModal('uploadImgModal')"
      class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3 me-2"
    >
      上傳圖片
    </button>
    <button
      @click="openModal('productModal')"
      class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
    >
      建立新的產品
    </button>
  </div>
  <div class="bg-white mt-4 p-3">
    <table class="table table-striped mb-0">
      <thead>
        <tr>
          <th>分類</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in products"
          :key="item.id"
        >
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.origin_price }}</td>
          <td>{{ item.price }}</td>
          <td>
            <span :class="item.is_enabled ? 'text-success' : 'text-danger'">{{
              item.is_enabled ? '啟用' : '未啟用'
            }}</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                @click="openModal('editModal', item)"
                type="button"
                class="btn btn-outline-primary btn-sm"
              >
                編輯
              </button>
              <button
                @click="openModal('delProductModal', item)"
                type="button"
                class="btn btn-outline-danger btn-sm"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <pagination
    :pages="pagination"
    @change-page="getAllProduct"
  ></pagination>
  <Product-Admin-Modal
    :current-product="currentProduct"
    :is-new="isNew"
    @product-instance="getProductModal"
    @refresh-products="refreshProducts"
  ></Product-Admin-Modal>
  <Product-Delete-Modal
    :current-product="currentProduct"
    @product-delete-instance="getProductDeleteModal"
    @refresh-products="refreshProducts"
  ></Product-Delete-Modal>
  <Upload-Img-Modal @upload-img-instance="getUploadImgModal"></Upload-Img-Modal>
</template>
