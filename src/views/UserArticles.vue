<script>
import { mapState, mapActions } from 'pinia';
import articlesStore from '../stores/articlesStore';

export default {
  methods: {
    ...mapActions(articlesStore, ['getAllArticle']),
  },
  mounted() {
    this.getAllArticle();
  },
  computed: {
    ...mapState(articlesStore, ['articles']),
  },
};
</script>

<template>
  <main class="py-12">
    <h2 class="text-center fs-11 mb-12">最新文章</h2>
    <div class="container">
      <ul class="row g-3 g-md-6">
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
                    class="w-100"
                    style="height: 300px;"
                    :alt="article.title"
                  />
                </div>
                <div class="card-body p-5">
                  <h5
                    class="card-title mb-2"
                    style="height: 40px;"
                  >{{ article.title }}</h5>
                  <div class="card-text">
                    <p
                      class="mb-2"
                      style="height: 120px;"
                    >{{ article.description }}</p>
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
    <!-- <pagination
      :pages="pagination"
      @change-page="(page) => getAllProduct(pagination.category, page)"
    ></pagination> -->
  </main>
</template>
