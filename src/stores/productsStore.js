import { defineStore } from 'pinia';
import axios from 'axios';
import sweetMessageStore from './sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productsStore', {
  state: () => ({
    products: [],
    currentProduct: {},
    pagination: {},
  }),
  actions: {
    getAllProduct(category = '', page = 1) {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}&page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data;
          this.products = products;
          this.pagination = pagination;
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    getProduct(productId) {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/product/${productId}`)
        .then((res) => {
          this.currentProduct = res.data.product;
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
