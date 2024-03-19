import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export default defineStore('sweetMessageStore', {
  state: () => ({
    sweetMessage: {
      icon: '',
      title: '',
      showConfirmButton: false,
      timer: 1500,
    },
    toastMessage: Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    }),
  }),
  actions: {
    setSweetMessageSuccess(message) {
      this.sweetMessage.icon = 'success';
      this.sweetMessage.title = message;
      this.sweetMessage.timer = 1500;
    },
    setSweetMessageError(message) {
      this.sweetMessage.icon = 'error';
      this.sweetMessage.title = message;
      this.sweetMessage.timer = 2500;
    },
  },
});
