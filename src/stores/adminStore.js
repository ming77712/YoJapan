import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default defineStore('adminStore', {
  state: () => ({
    status: false,
  }),
  actions: {
    checkLogin(routerMethod) {
      axios
        .post(`${VITE_URL}/api/user/check`)
        .then(() => {
          this.status = true;
        })
        .catch(() => {
          routerMethod('/login');
        });
    },
    logout(routerMethod) {
      axios
        .post(`${VITE_URL}/logout`)
        .then((res) => {
          this.status = false;
          document.cookie = 'hexToken=; expires=;';
          routerMethod('/');
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch(() => {
          routerMethod('/login');
        });
    },
  },
});
