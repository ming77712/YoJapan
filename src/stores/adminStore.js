import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_URL } = import.meta.env;

export default defineStore('adminStore', () => {
  const status = ref(false);

  const checkLogin = async (routerMethod) => {
    try {
      await axios.post(`${VITE_URL}/api/user/check`);
      status.value = true;
    } catch (err) {
      routerMethod('/login');
    }
  };

  const logout = async (routerMethod) => {
    try {
      const res = await axios.post(`${VITE_URL}/logout`);
      status.value = false;
      document.cookie = 'hexToken=; expires=;';
      routerMethod('/');
      Swal.fire({
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      routerMethod('/login');
    }
  };

  return {
    status,
    checkLogin,
    logout,
  };
});
