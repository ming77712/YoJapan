import { defineStore } from 'pinia';
import axios from 'axios';
import sweetMessageStore from './sweetMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('articlesStore', {
  state: () => ({
    articles: [],
    currentArticle: {},
    pagination: {},
  }),
  actions: {
    getAllArticle(page = 1) {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/articles?page=${page}`)
        .then((res) => {
          const { articles, pagination } = res.data;
          this.articles = articles;
          this.pagination = pagination;
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    getArticle(articleId) {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/article/${articleId}`)
        .then((res) => {
          this.currentArticle = res.data.article;
        })
        .catch((err) => {
          toastMessage.fire({
            icon: 'error',
            title: err.response.data.message,
          });
        });
    },
    getIndexArticle() {
      const { toastMessage } = sweetMessageStore();
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/articles`)
        .then((res) => {
          const indexArticle = res.data.articles;
          indexArticle.length = 4;
          this.articles = indexArticle;
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
