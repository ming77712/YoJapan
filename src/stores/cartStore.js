import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

const { toastMessage, showError } = useSweetMessageStore();

export default defineStore('cartStore', () => {
  const carts = ref([]);
  const cartCount = ref(0);
  const loadingStatus = ref('');

  const getCart = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`);
      const { data } = res.data;
      carts.value = data;
      cartCount.value = carts.value.carts.length;
    } catch (err) {
      showError(err);
    }
  };

  const addToCart = async (productId, qty = 1) => {
    const data = {
      product_id: productId,
      qty,
    };

    loadingStatus.value = productId;

    try {
      const res = await axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data });
      toastMessage.value.fire({
        icon: 'success',
        title: res.data.message,
      });
      loadingStatus.value = '';
      getCart();
    } catch (err) {
      showError(err);
    }
  };

  const changeQty = async (cartId, productId, e) => {
    const data = {
      product_id: productId,
      qty: Number(e.target.value),
    };

    try {
      const res = await axios.put(`${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`, { data });
      toastMessage.value.fire({
        icon: 'success',
        title: res.data.message,
      });
      getCart();
    } catch (err) {
      showError(err);
    }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${VITE_URL}/api/${VITE_PATH}/carts`);
          toastMessage.value.fire({
            icon: 'success',
            title: res.data.message,
          });
          getCart();
        } catch (err) {
          showError(err);
        }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${VITE_URL}/api/${VITE_PATH}/cart/${productId}`);
          toastMessage.value.fire({
            icon: 'success',
            title: res.data.message,
          });
          getCart();
        } catch (err) {
          showError(err);
        }
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
