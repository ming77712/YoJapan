import { ref, onMounted } from 'vue';
import { Modal } from 'bootstrap';

export default () => {
  const modal = ref(null);
  const modalRef = ref(null);

  onMounted(() => {
    modalRef.value = new Modal(modal.value);
  });

  return {
    modal,
    openModal() {
      modalRef.value.show();
    },
    hideModal() {
      modalRef.value.hide();
    },
  };
};
