<script>
import { mapState, mapActions } from 'pinia';
import articlesStore from '@/stores/articlesStore';
import Pagination from '@/components/PaginationComponent.vue';

export default {
  methods: {
    ...mapActions(articlesStore, ['getAllArticle']),
  },
  mounted() {
    this.getAllArticle();
  },
  computed: {
    ...mapState(articlesStore, ['articles', 'pagination']),
  },
  components: {
    Pagination,
  },
};
</script>

<template>
  <main class="py-lg-12 py-md-10 py-8">
    <h2 class="text-center fs-lg-11 fs-md-3 fs-4 mb-lg-12 mb-md-10 mb-8">最新文章</h2>
    <div class="container">
      <ul class="row g-4 g-md-5 g-lg-6">
        <template
          v-for="(article, index) in articles"
          :key="index"
        >
          <li class="col-md-6 col-lg-4">
            <RouterLink
              :to="`/articles/${article.id}`"
              class="zoomIn w-100"
            >
              <div class="card rounded-0">
                <div class="card-top overflow-hidden">
                  <img
                    :src="article.imageUrl"
                    class="articleImgHeight w-100"
                    :alt="article.title"
                  />
                </div>
                <div class="card-body p-5">
                  <h5 class="articleTitleHeight card-title mb-4">{{ article.title }}</h5>
                  <div class="card-text">
                    <p class="articleContentHeight mb-2">{{ article.description }}</p>
                    <span class="me-1">{{ article.author }}</span>
                    <span>| {{ $filters.dateUS(article.create_at) }}</span>
                  </div>
                </div>
              </div>
            </RouterLink>
          </li>
        </template>
      </ul>
    </div>
    <pagination
      :pages="pagination"
      @change-page="(page) => getAllArticle(page)"
    ></pagination>
  </main>
</template>

<style lang="scss" scoped>
.articleImgHeight {
  height: 200px;

  @media (min-width: 768px) {
    height: 250px;
  }

  @media (min-width: 992px) {
    height: 300px;
  }
}

.articleTitleHeight {
  height: 48px;

  @media (min-width: 768px) {
    height: 56px;
  }

  @media (min-width: 992px) {
    height: 64px;
  }
}

.articleContentHeight {
  height: 148px;

  @media (min-width: 768px) {
    height: 156px;
  }

  @media (min-width: 992px) {
    height: 164px;
  }
}
</style>
