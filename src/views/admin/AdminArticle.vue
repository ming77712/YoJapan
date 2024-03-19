<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import sweetMessageStore from '../../stores/sweetMessageStore';
import ArticleModal from '../../components/admin/ArticleModal.vue';
import DelModal from '../../components/admin/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      articles: [],
      isLoading: false,
      isNew: false,
      tempArticle: {},
      currentPage: 1,
    };
  },
  components: {
    ArticleModal,
    DelModal,
  },
  methods: {
    ...mapActions(sweetMessageStore, [
      'setSweetMessageSuccess',
      'setSweetMessageError',
    ]),
    getArticles(page = 1) {
      this.currentPage = page;
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/admin/articles?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            const { articles, pagination } = res.data;
            this.articles = articles;
            this.pagination = pagination;
          }
        })
        .catch((err) => {
          // axios 的錯誤狀態，可參考：https://github.com/axios/axios#handling-errors
          console.log('error', err.response, err.request, err.message);
          this.setSweetMessageError(err.response.data.message);
          Swal.fire(this.sweetMessage);
        });
    },
    getArticle(id) {
      axios
        .get(`${VITE_URL}/api/${VITE_PATH}/admin/article/${id}`)
        .then((res) => {
          this.openModal(false, res.data.article);
          this.isNew = false;
        })
        .catch((err) => {
          // axios 的錯誤狀態，可參考：https://github.com/axios/axios#handling-errors
          console.log('error', err.response, err.request, err.message);
          this.setSweetMessageError(err.response.data.message);
          Swal.fire(this.sweetMessage);
        });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.isNew = true;
      } else {
        this.tempArticle = { ...item };
        this.isNew = false;
      }
      this.$refs.articleModal.openModal();
    },
    updateArticle(item) {
      this.tempArticle = item;
      let api = `${VITE_URL}/api/${VITE_PATH}/admin/article`;
      let httpMethod = 'post';
      // let status = '新增貼文';
      if (!this.isNew) {
        api = `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`;
        httpMethod = 'put';
        // status = '更新貼文';
      }
      const articleComponent = this.$refs.articleModal;
      axios[httpMethod](api, { data: this.tempArticle })
        .then((res) => {
          this.toastMessage.fire({
            icon: 'success',
            title: res.data.message,
          });
          articleComponent.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((err) => {
          this.setSweetMessageError(err.response.data.message);
          Swal.fire(this.sweetMessage);
        });
    },
    openDelArticleModal(item) {
      this.tempArticle = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    delArticle() {
      axios
        .delete(
          `${VITE_URL}/api/${VITE_PATH}/admin/article/${this.tempArticle.id}`,
        )
        .then((res) => {
          this.toastMessage.fire({
            icon: 'success',
            title: res.data.message,
          });
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getArticles(this.currentPage);
        })
        .catch((err) => {
          this.setSweetMessageError(err.response.data.message);
          Swal.fire(this.sweetMessage);
        });
    },
  },
  mounted() {
    this.getArticles();
  },
  computed: {
    ...mapState(sweetMessageStore, ['sweetMessage', 'toastMessage']),
  },
};
</script>

<template>
  <h3 class="mt-4">貼文管理</h3>
  <div>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
        type="button"
        @click="openModal(true)"
      >
        建立新的貼文
      </button>
    </div>
    <div class="bg-white mt-4 p-3">
      <table class="table table-striped mb-0">
        <thead>
          <tr>
            <th>標題</th>
            <th>作者</th>
            <th>描述</th>
            <th>建立時間</th>
            <th>是否公開</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in articles"
            :key="article.id"
          >
            <td>{{ article.title }}</td>
            <td>{{ article.author }}</td>
            <td>{{ article.description }}</td>
            <td>{{ $filters.date(article.create_at) }}</td>
            <td>
              <span v-if="article.isPublic">已上架</span>
              <span v-else>未上架</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="getArticle(article.id)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelArticleModal(article)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ArticleModal
      ref="articleModal"
      :article="tempArticle"
      :is-new="isNew"
      @update-article="updateArticle"
    >
    </ArticleModal>
    <DelModal
      :item="tempArticle"
      ref="delModal"
      @del-item="delArticle"
    />
  </div>
</template>
