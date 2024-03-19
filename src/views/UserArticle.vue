<script>
import { mapState, mapActions } from 'pinia';
import articlesStore from '../stores/articlesStore';

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(articlesStore, ['getArticle']),
  },
  mounted() {
    const { id } = this.$route.params;
    this.getArticle(id);
  },
  computed: {
    ...mapState(articlesStore, ['currentArticle']),
  },
};
</script>

<template>
  <img
    :src="this.currentArticle.imageUrl"
    class="position-relative w-100"
    style="height: 400px;"
    alt="this.currentArticle.title"
  >
  <div class="articleWrap container position-absolute top-60 start-50 transform bg-white">
    <div class="px-8 py-6">
      <nav
        class="mb-8"
        aria-label="breadcrumb"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/articles">最新文章</RouterLink>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
          >
            {{ this.currentArticle.title }}
          </li>
        </ol>
      </nav>
      <h2 class="fs-11 mb-5">
        {{ this.currentArticle.title }}
      </h2>
      <span class="fw-bold me-1">{{ this.currentArticle.author }}</span>
      <span>| {{ $filters.dateUS(this.currentArticle.create_at) }}</span>
      <div class="d-flex gap-3 my-4">
        <template
          v-for="(item, index) in this.currentArticle.tag"
          :key="index"
        >
          <span class="text-gray"># {{ item }}</span>
        </template>
      </div>
      <div
        class=""
        v-html="currentArticle.content"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.articleWrap {
  width: 900px;
}

.transform {
  transform: translate(-50%, -30%);
}
</style>
