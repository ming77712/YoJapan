<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';
import ArticleModal from '@/components/admin/ArticleModal.vue';
import DelModal from '@/components/admin/DelModal.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

const allArticle = ref([]);
// const isLoading = ref(false);
const isNew = ref(false);
const tempArticle = ref({});
const currentPagination = ref({});
const currentPage = ref(1);
const articleModal = ref(null);
const delModal = ref(null);

const getArticles = (page = 1) => {
  currentPage.value = page;
  axios
    .get(`${VITE_URL}/api/${VITE_PATH}/admin/articles?page=${page}`)
    .then((res) => {
      if (res.data.success) {
        const { articles, pagination } = res.data;
        allArticle.value = articles;
        currentPagination.value = pagination;
      }
    })
    .catch((err) => {
      store.setSweetMessageError(err.response.data.message);
      Swal.fire(store.sweetMessage);
    });
};

const openModal = (state, item) => {
  if (state) {
    tempArticle.value = {
      isPublic: false,
      create_at: new Date().getTime() / 1000,
      tag: [],
    };
    isNew.value = true;
  } else {
    tempArticle.value = { ...item };
    isNew.value = false;
  }
  articleModal.value.openModal();
};

const getArticle = (id) => {
  axios
    .get(`${VITE_URL}/api/${VITE_PATH}/admin/article/${id}`)
    .then((res) => {
      openModal(false, res.data.article);
      isNew.value = false;
    })
    .catch((err) => {
      store.setSweetMessageError(err.response.data.message);
      Swal.fire(store.sweetMessage);
    });
};

const updateArticle = (item) => {
  tempArticle.value = item;
  let api = `${VITE_URL}/api/${VITE_PATH}/admin/article`;
  let httpMethod = 'post';
  if (!isNew.value) {
    api = `${VITE_URL}/api/${VITE_PATH}/admin/article/${tempArticle.value.id}`;
    httpMethod = 'put';
  }
  axios[httpMethod](api, { data: tempArticle.value })
    .then((res) => {
      store.toastMessage.fire({
        icon: 'success',
        title: res.data.message,
      });
      articleModal.value.hideModal();
      getArticles(currentPage.value);
    })
    .catch((err) => {
      store.setSweetMessageError(err.response.data.message);
      Swal.fire(store.sweetMessage);
    });
};

const openDelArticleModal = (item) => {
  tempArticle.value = { ...item };
  delModal.value.openModal();
};

const delArticle = () => {
  axios
    .delete(
      `${VITE_URL}/api/${VITE_PATH}/admin/article/${tempArticle.value.id}`,
    )
    .then((res) => {
      store.toastMessage.fire({
        icon: 'success',
        title: res.data.message,
      });
      delModal.value.hideModal();
      getArticles(currentPage.value);
    })
    .catch((err) => {
      store.setSweetMessageError(err.response.data.message);
      Swal.fire(store.sweetMessage);
    });
};

onMounted(() => {
  getArticles();
});
</script>

<template>
  <h3 class="mt-4">貼文管理</h3>
  <div>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
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
            v-for="article in allArticle"
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
