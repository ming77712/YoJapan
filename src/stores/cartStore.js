import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

export default defineStore('cartStore', () => {
  const carts = ref([]);
  const cartCount = ref(0);
  const loadingStatus = ref('');

  const getCart = () => {
    axios
      .get(`${VITE_URL}/api/${VITE_PATH}/cart`)
      .then((res) => {
        carts.value = res.data.data;
        cartCount.value = carts.value.carts.length;
      })
      .catch((err) => {
        store.toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const addToCart = (productId, qty = 1) => {
    const data = {
      product_id: productId,
      qty,
    };

    loadingStatus.value = productId;

    axios
      .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
      .then((res) => {
        store.toastMessage.fire({
          icon: 'success',
          title: res.data.message,
        });
        loadingStatus.value = '';
        getCart();
      })
      .catch((err) => {
        store.toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const changeQty = (cartId, productId, e) => {
    const data = {
      product_id: productId,
      qty: Number(e.target.value),
    };

    axios
      .put(`${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`, { data })
      .then((res) => {
        store.toastMessage.fire({
          icon: 'success',
          title: res.data.message,
        });
        getCart();
      })
      .catch((err) => {
        store.toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const removeCartAllItem = () => {
    Swal.fire({
      title: '確定要清空購物車?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff5b00',
      cancelButtonColor: '#9d9d9d',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
          .then((res) => {
            store.toastMessage.fire({
              icon: 'success',
              title: res.data.message,
            });
            getCart();
          })
          .catch((err) => {
            store.toastMessage.fire({
              icon: 'error',
              title: err.response.data.message,
            });
          });
      }
    });
  };

  const removeCartItem = (productId) => {
    Swal.fire({
      title: '確定要刪除該商品?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff5b00',
      cancelButtonColor: '#9d9d9d',
      confirmButtonText: '確定',
      cancelButtonText: '取消',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${productId}`)
          .then((res) => {
            store.toastMessage.fire({
              icon: 'success',
              title: res.data.message,
            });
            getCart();
          })
          .catch((err) => {
            store.toastMessage.fire({
              icon: 'error',
              title: err.response.data.message,
            });
          });
      }
    });
  };

  return {
    carts,
    cartCount,
    loadingStatus,
    getCart,
    addToCart,
    changeQty,
    removeCartAllItem,
    removeCartItem,
  };
});
