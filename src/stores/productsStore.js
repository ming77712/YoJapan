import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

const { showError } = useSweetMessageStore();

export default defineStore('productsStore', () => {
  const allProduct = ref([]);
  const currentProduct = ref({});
  const randomProducts = ref([]);
  const currentPagination = ref({});

  const getIndexProduct = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/products/all`);
      const { products } = res.data;
      allProduct.value = products;
    } catch (err) {
      showError(err);
    }
  };

  const getAllProduct = async (category = '', page = 1) => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}&page=${page}`);
      const { products, pagination } = res.data;
      allProduct.value = products;
      currentPagination.value = pagination;
    } catch (err) {
      showError(err);
    }
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

  const getRandomCategoryProducts = async (category, id) => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/products?category=${category}`);
      const { products } = res.data;
      randomProducts.value = products;
      randomProducts.value = randomProducts.value.filter(
        (item) => item.id !== id,
      );
      getRandom(randomProducts.value.length);
    } catch (err) {
      showError(err);
    }
  };

  const getProduct = async (productId) => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/product/${productId}`);
      const { product } = res.data;
      currentProduct.value = product;
      getRandomCategoryProducts(
        currentProduct.value.category,
        currentProduct.value.id,
      );
    } catch (err) {
      showError(err);
    }
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
