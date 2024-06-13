<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useArticlesStore from '@/stores/articlesStore';

const store = useArticlesStore();
const route = useRoute();

onMounted(() => {
  const { id } = route.params;
  store.getArticle(id);
});

</script>

<template>
  <main class="pb-lg-12 pb-md-10 pb-8">
    <img
      :src="store.currentArticle.imageUrl"
      class="w-100"
      style="height: 400px;"
      alt="store.currentArticle.title"
    >
    <div class="articleWrap container">
      <div class="mtSpace d-flex flex-column bg-white">
        <div class="p-8">
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
                {{ store.currentArticle.title }}
              </li>
            </ol>
          </nav>
          <h2 class="fs-11 mb-5">
            {{ store.currentArticle.title }}
          </h2>
          <span class="fw-bold me-1">{{ store.currentArticle.author }}</span>
          <span>| {{ $filters.dateUS(store.currentArticle.create_at) }}</span>
          <div class="d-flex gap-2 gap-md-3 gap-lg-4 my-4">
            <template
              v-for="(item, index) in store.currentArticle.tag"
              :key="index"
            >
              <span class="text-gray"># {{ item }}</span>
            </template>
          </div>
          <div
            class="fs-5"
            v-html="store.currentArticle.content"
          ></div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.mtSpace {
  position: relative;
  z-index: 50;
  margin-top: -32px;

  @media (min-width: 992px) {
    margin-top: -84px;
  }
}

.articleWrap {
  @media (min-width: 992px) {
    width: 900px;
  }
}
</style>
