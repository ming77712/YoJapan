import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import sweetMessageStore from './sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('articlesStore', () => {
  const allArticle = ref([]);
  const currentArticle = ref({});
  const renderPagination = ref({});

  const getAllArticle = (page = 1) => {
    const { toastMessage } = sweetMessageStore();
    axios
      .get(`${VITE_URL}/api/${VITE_PATH}/articles?page=${page}`)
      .then((res) => {
        const { articles, pagination } = res.data;
        allArticle.value = articles;
        renderPagination.value = pagination;
      })
      .catch((err) => {
        toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const getArticle = (articleId) => {
    const { toastMessage } = sweetMessageStore();
    axios
      .get(`${VITE_URL}/api/${VITE_PATH}/article/${articleId}`)
      .then((res) => {
        currentArticle.value = res.data.article;
      })
      .catch((err) => {
        toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  const getIndexArticle = () => {
    const { toastMessage } = sweetMessageStore();
    axios
      .get(`${VITE_URL}/api/${VITE_PATH}/articles`)
      .then((res) => {
        const indexArticle = res.data.articles;
        indexArticle.length = 4;
        allArticle.value = indexArticle;
      })
      .catch((err) => {
        toastMessage.fire({
          icon: 'error',
          title: err.response.data.message,
        });
      });
  };

  return {
    allArticle,
    currentArticle,
    renderPagination,
    getAllArticle,
    getArticle,
    getIndexArticle,
  };
});
