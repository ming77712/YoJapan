import { defineStore } from 'pinia';
import axios from 'axios';
import sweetMessageStore from './sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('productsStore', {
  state: () => ({
    products: [],
    currentProduct: {},
    randomProducts: [],
    pagination: {},
  }),
  actions: {
    getAllProduct(category = '', page = 1) {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(
          `${VITE_URL}/api/${VITE_PATH}/products?category=${category}&page=${page}`,
        )
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
          this.getRandomCategoryProducts(this.currentProduct.category, this.currentProduct.id);
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    getRandomCategoryProducts(category, id) {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}`)
        .then((res) => {
          const { products } = res.data;
          this.randomProducts = products;
          this.randomProducts = this.randomProducts.filter(
            (item) => item.id !== id,
          );
          this.getRandom(this.randomProducts.length);
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    getRandom(max) {
      const totalNum = [];
      let times = 4;

      while (times > 0) {
        const randomNum = Math.floor(Math.random() * max) + 1;
        const haveNum = totalNum.find((item) => item === randomNum);

        if (haveNum === undefined) {
          totalNum.push(randomNum);
          times -= 1;
        }
      }

      this.randomProducts = this.randomProducts
        .filter((item, index) => totalNum.includes(index + 1));
    },
  },
});
