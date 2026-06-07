import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import sweetMessageStore from './sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('articlesStore', () => {
  const { showError } = sweetMessageStore();

  const allArticle = ref([]);
  const currentArticle = ref({});
  const renderPagination = ref({});

  const getAllArticle = async (page = 1) => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/articles?page=${page}`);
      const { articles, pagination } = res.data;
      allArticle.value = articles;
      renderPagination.value = pagination;
    } catch (err) {
      showError(err);
    }
  };

  const getArticle = async (articleId) => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/article/${articleId}`);
      currentArticle.value = res.data.article;
    } catch (err) {
      showError(err);
    }
  };

  const getIndexArticle = async () => {
    try {
      const res = await axios.get(`${VITE_URL}/api/${VITE_PATH}/articles`);
      const indexArticle = res.data.articles;
      indexArticle.length = 4;
      allArticle.value = indexArticle;
    } catch (err) {
      showError(err);
    }
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
