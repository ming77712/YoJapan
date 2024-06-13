import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default defineStore('adminStore', () => {
  const status = ref(false);

  const checkLogin = (routerMethod) => {
    axios
      .post(`${VITE_URL}/api/user/check`)
      .then(() => {
        status.value = true;
      })
      .catch(() => {
        routerMethod('/login');
      });
  };

  const logout = (routerMethod) => {
    axios
      .post(`${VITE_URL}/logout`)
      .then((res) => {
        status.value = false;
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
  };

  return {
    status,
    checkLogin,
    logout,
  };
});
