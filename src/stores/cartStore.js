import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';
import sweetMessageStore from './sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    cartCount: 0,
    loadingStatus: '',
  }),
  actions: {
    getCart() {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
          this.carts = res.data.data;
          this.cartCount = this.carts.carts.length;
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    addToCart(productId, routerMethod, qty = 1) {
      const { toastMessage } = sweetMessageStore();
      const data = {
        product_id: productId,
        qty,
      };

      this.loadingStatus = productId;

      axios
        .post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
        .then((res) => {
          if (routerMethod) {
            routerMethod('/products');
          }
          toastMessage.fire({
            icon: 'success',
            title: res.data.message,
          });
          this.loadingStatus = '';
          this.getCart();
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    changeQty(cartId, productId, e) {
      const { toastMessage } = sweetMessageStore();
      const data = {
        product_id: productId,
        qty: Number(e.target.value),
      };

      axios
        .put(`${VITE_URL}/api/${VITE_PATH}/cart/${cartId}`, { data })
        .then((res) => {
          toastMessage.fire({
            icon: 'success',
            title: res.data.message,
          });
          this.getCart();
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    removeCartAllItem() {
      const { toastMessage } = sweetMessageStore();
      Swal.fire({
        title: '確定要清空購物車?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${VITE_URL}/api/${VITE_PATH}/carts`)
            .then((res) => {
              toastMessage.fire({
                icon: 'success',
                title: res.data.message,
              });
              this.getCart();
            })
            .catch((err) => {
              toastMessage.fire({
                icon: 'error',
                title: err.response.data.message,
              });
            });
        }
      });
    },
    removeCartItem(productId) {
      const { toastMessage } = sweetMessageStore();
      axios
        .delete(`${VITE_URL}/api/${VITE_PATH}/cart/${productId}`)
        .then((res) => {
          toastMessage.fire({
            icon: 'success',
            title: res.data.message,
          });
          this.getCart();
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
  },
});
