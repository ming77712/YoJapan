<script setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

const modal = ref(null);
const uploadImgModal = ref(null);

const formData = ref(null);
const imageUrl = ref('');

const emits = defineEmits(['UploadImgInstance']);

const uploadImg = () => {
  if (typeof formData.value !== 'object') return;
  axios
    .post(`${VITE_URL}/api/${VITE_PATH}/admin/upload`, formData.value)
    .then((res) => {
      imageUrl.value = res.data.imageUrl;
      store.setSweetMessageSuccess('圖片新增成功');
      Swal.fire(store.sweetMessage);
    })
    .catch((err) => {
      store.setSweetMessageError(err.message);
      Swal.fire(store.sweetMessage);
    });
};

const handleUploadImg = (e) => {
  formData.value = new FormData();
  formData.value.append('file-to-upload', e.target.files[0]);
};

onMounted(() => {
  uploadImgModal.value = new Modal(modal.value, {
    keyboard: false,
    backdrop: 'static',
  });
  emits('UploadImgInstance', uploadImgModal.value);
});

</script>

<template>
  <div
    id="uploadImgModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="uploadImgModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5
            id="delProductModalLabel"
            class="modal-title"
          >
            <span>上傳圖片</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="mb-2">
            <input
              type="file"
              name="file-to-upload"
              @change="handleUploadImg"
            />
          </form>
          <div>
            <img
              class="mb-2"
              :src="imageUrl"
            />
            <div class="mb-2">
              <label
                for="imgUrl"
                class="form-label"
              >圖片位址</label>
              <input
                id="imgUrl"
                type="text"
                class="form-control"
                :value="imageUrl"
              />
            </div>
          </div>
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
            @click="uploadImg"
          >
            上傳
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
