import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export default defineStore('sweetMessageStore', () => {
  const sweetMessage = ({
    icon: '',
    title: '',
    showConfirmButton: false,
    timer: 1500,
  });
  const toastMessage = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
  });

  const setSweetMessageSuccess = (message) => {
    sweetMessage.icon = 'success';
    sweetMessage.title = message;
    sweetMessage.timer = 1500;
  };

  const setSweetMessageError = (message) => {
    sweetMessage.icon = 'error';
    sweetMessage.title = message;
    sweetMessage.timer = 2500;
  };

  const showError = (err) => {
    toastMessage.fire({
      icon: 'error',
      title: err.response?.data?.message || '發生錯誤',
    });
  };

  return {
    sweetMessage,
    toastMessage,
    setSweetMessageSuccess,
    setSweetMessageError,
    showError,
  };
});
