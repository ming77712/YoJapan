import { ref } from 'vue';
import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export default defineStore('sweetMessageStore', () => {
  const sweetMessage = ref({
    icon: '',
    title: '',
    showConfirmButton: false,
    timer: 1500,
  });
  const toastMessage = ref(Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  }));

  const setSweetMessageSuccess = (message) => {
    sweetMessage.value.icon = 'success';
    sweetMessage.value.title = message;
    sweetMessage.value.timer = 1500;
  };

  const setSweetMessageError = (message) => {
    sweetMessage.value.icon = 'error';
    sweetMessage.value.title = message;
    sweetMessage.value.timer = 2500;
  };

  return {
    sweetMessage,
    toastMessage,
    setSweetMessageSuccess,
    setSweetMessageError,
  };
});
