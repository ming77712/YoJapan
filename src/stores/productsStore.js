import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

export default defineStore('productsStore', () => {
  const allProduct = ref([]);
  const currentProduct = ref({});
  const randomProducts = ref([]);
  const currentPagination = ref({});

  const getIndexProduct = () => {
    axios
      .get(
        `${VITE_URL}/api/${VITE_PATH}/products/all`,
      )
      .then((res) => {
        const { products } = res.data;
        allProduct.value = products;
      })
      .catch((err) => {
        store.toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const getAllProduct = (category = '', page = 1) => {
    axios
      .get(
        `${VITE_URL}/api/${VITE_PATH}/products?category=${category}&page=${page}`,
      )
      .then((res) => {
        const { products, pagination } = res.data;
        allProduct.value = products;
        currentPagination.value = pagination;
      })
      .catch((err) => {
        store.toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const getRandom = (productNum) => {
    const totalNum = [];
    let times = 4;

    while (times > 0) {
      const randomNum = Math.floor(Math.random() * productNum) + 1;
      const haveNum = totalNum.find((item) => item === randomNum);

      if (haveNum === undefined) {
        totalNum.push(randomNum);
        times -= 1;
      }
    }

    randomProducts.value = randomProducts.value.filter(
      (item, index) => totalNum.includes(index + 1),
    );
  };

  const getRandomCategoryProducts = (category, id) => {
    axios
      .get(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}`)
      .then((res) => {
        const { products } = res.data;
        randomProducts.value = products;
        randomProducts.value = randomProducts.value.filter(
          (item) => item.id !== id,
        );
        getRandom(randomProducts.value.length);
      })
      .catch((err) => {
        store.toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const getProduct = (productId) => {
    axios
      .get(`${VITE_URL}/api/${VITE_PATH}/product/${productId}`)
      .then((res) => {
        currentProduct.value = res.data.product;
        getRandomCategoryProducts(
          currentProduct.value.category,
          currentProduct.value.id,
        );
      })
      .catch((err) => {
        store.toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  return {
    allProduct,
    currentProduct,
    randomProducts,
    currentPagination,
    getAllProduct,
    getProduct,
    getIndexProduct,
  };
});
