<script setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

const props = defineProps(['currentProduct']);

const modal = ref(null);
const delProductModal = ref(null);

const emits = defineEmits(['refreshProducts', 'productDeleteInstance']);

const delProduct = () => {
  axios
    .delete(
      `${VITE_URL}/api/${VITE_PATH}/admin/product/${props.currentProduct.id}`,
    )
    .then((res) => {
      store.setSweetMessageSuccess(res.data.message);
      Swal.fire(store.sweetMessage);
      setTimeout(() => {
        delProductModal.value.hide();
        emits('refreshProducts');
      }, 1500);
    })
    .catch((err) => {
      store.setSweetMessageError(err.data.message);
      Swal.fire(store.sweetMessage);
    });
};

onMounted(() => {
  delProductModal.value = new Modal(modal.value, {
    keyboard: false,
    backdrop: 'static',
  });
  emits('productDeleteInstance', delProductModal.value);
});

</script>

<template>
  <div
    id="delProductModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5
            id="delProductModalLabel"
            class="modal-title"
          >
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ currentProduct.title }}</strong>
          商品(刪除後將無法恢復)。
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
            class="btn btn-danger"
            @click="delProduct"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
