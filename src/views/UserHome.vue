<script>
import { mapState, mapActions } from 'pinia';
import BannerSwiper from '@/components/BannerSwiper.vue';
import ProductsSwiper from '@/components/ProductsSwiper.vue';

import articlesStore from '@/stores/articlesStore';

export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(articlesStore, ['getIndexArticle']),
  },
  mounted() {
    this.getIndexArticle();
  },
  computed: {
    ...mapState(articlesStore, ['articles']),
  },
  components: {
    BannerSwiper,
    ProductsSwiper,
  },
};
</script>

<template>
  <main>
    <BannerSwiper />
    <section class="mt-18">
      <div class="container">
        <h2 class="fs-3 mb-5">熱門地區</h2>
        <div class="row mb-3">
          <div class="col-md-8 g-0">
            <img
              src="/images/category/photo-1526193439956-0d961851d084.avif"
              class="w-100"
              style="height: 250px;"
              alt="Tokyo-pic"
            >
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-center
           borderColor g-0 p-4">
            <h3 class="fs-5 fs-md-4 fs-lg-3 mb-1">東京</h3>
            <p>魅力無限！</p>
            <p class="mb-3">摩天大樓、繁華街道、流行文化，還有美食天堂，24小時都充滿著活力！</p>
            <RouterLink
              to="/products?category=東京"
              class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3 w-50"
            >
              立即前往
            </RouterLink>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-4 d-flex flex-column justify-content-center
           order-2 order-md-1 borderColor g-0 p-4">
            <h3 class="fs-5 fs-md-4 fs-lg-3 mb-1">大阪</h3>
            <p>熱情似火！</p>
            <p class="mb-3">美食之都，不僅有美味的壽司和燒肉，還有獨特的文化和歷史，人們總是笑容滿面！</p>
            <RouterLink
              to="/products?category=大阪"
              class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3 w-50"
            >
              立即前往
            </RouterLink>
          </div>
          <div class="col-md-8 g-0 order-1 order-md-2">
            <img
              src="/images/category/photo-1560291544-515e5417bddb.avif"
              class="w-100"
              style="height: 250px;"
              alt="Osaka-pic"
            >
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-8 g-0">
            <img
              src="/images/category/photo-1545569341-9eb8b30979d9.avif"
              class="w-100"
              style="height: 250px;"
              alt="Kyoto-pic"
            >
          </div>
          <div class="col-md-4 d-flex flex-column justify-content-center
           borderColor g-0 p-4">
            <h3 class="fs-5 fs-md-4 fs-lg-3 mb-1">京都</h3>
            <p>神秘浪漫！</p>
            <p class="mb-3">古老的寺廟、傳統的茶室、美麗的花園，處處都充滿著日本的傳統美學和宗教氛圍！</p>
            <RouterLink
              to="/products?category=京都"
              class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3 w-50"
            >
              立即前往
            </RouterLink>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-4 d-flex flex-column justify-content-center
           order-2 order-md-1 borderColor g-0 p-4">
            <h3 class="fs-5 fs-md-4 fs-lg-3 mb-1">北海道</h3>
            <p>大自然的樂園！</p>
            <p class="mb-3">絕美的風景、新鮮的海鮮、冬季的滑雪勝地，無論何時都能讓人心曠神怡！</p>
            <RouterLink
              to="/products?category=北海道"
              class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3 w-50"
            >
              立即前往
            </RouterLink>
          </div>
          <div class="col-md-8 g-0 order-1 order-md-2">
            <img
              src="/images/category/photo-1682594400910-b3477570b4a4.avif"
              class="w-100"
              style="height: 250px;"
              alt="Hokkaido-pic"
            >
          </div>
        </div>
      </div>
    </section>
    <section class="indexZoneImg mt-18 py-15">
      <div class="container">
        <div class="row">
          <div class="zindex-1 col-md-4 p-8">
            <div class="text-center border border-white py-2">
              <img
                src="../../public/images/ticket.svg"
                alt="ticket-icon"
                style="height: 100px; width: 100px;"
              >
              <p class="text-white fs-4 mt-3">門票預訂</p>
            </div>
          </div>
          <div class="zindex-1 col-md-4 p-8">
            <div class="text-center border border-white py-2">
              <img
                src="../../public/images/plan.svg"
                style="height: 100px; width: 100px;"
                alt="plan-icon"
              >
              <p class="text-white fs-4 mt-3">行程安排</p>
            </div>
          </div>
          <div class="zindex-1 col-md-4 p-8">
            <div class="text-center border border-white py-2">
              <img
                src="../../public/images/book-online-rounded.svg"
                style="height: 100px; width: 100px;"
                alt="book-online-icon"
              >
              <p class="text-white fs-4 mt-3">線上完成</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-18">
      <div class="container">
        <h2 class="fs-3">行程瀏覽</h2>
        <ProductsSwiper />
      </div>
    </section>
    <section class="mt-18">
      <div class="container">
        <h2 class="fs-3 mb-5">最新文章</h2>
        <ul class="mb-10 mb-md-20">
          <template
            v-for="(item, index) in articles"
            :key="item.id"
          >
            <li
              class="zoomIn row justify-content-center g-0 mb-4 mb-md-9"
              v-if="index % 2 !== 0"
            >
              <div class="col-md-6 order-2 order-md-1">
                <div class="articleHeight card rounded-0 mb-4 mb-md-0">
                  <div class="card-body p-4 p-md-8">
                    <div class="card-title mb-6">
                      <h3 class="fs-4 mb-2">{{ item.title }}</h3>
                      <time class="me-4">{{ $filters.dateUS(item.create_at) }}</time>
                      <span>{{ item.author }}</span>
                    </div>
                    <div class="card-text">
                      <p class="fw-light fs-6 fs-md-5 mb-6">
                        {{ item.description }}
                      </p>
                      <RouterLink
                        :to="`/articles/${item.id}`"
                        class="btn btn-primary border-2 rounded-3 text-white
                      fw-600 px-5 py-3 w-50"
                      >
                        閱讀更多
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 order-1 order-md-2">
                <div class="overflow-hidden w-100">
                  <img
                    class="articleHeight w-100"
                    :src="item.imageUrl"
                    alt="item.title"
                  />
                </div>
              </div>
            </li>
            <li
              class="zoomIn row justify-content-center g-0 mb-4 mb-md-9"
              v-else
            >
              <div class="col-md-6">
                <div class="overflow-hidden w-100">
                  <img
                    class="articleHeight w-100"
                    :src="item.imageUrl"
                    alt="item.title"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="articleHeight card rounded-0 mb-4 mb-md-0">
                  <div class="card-body p-4 p-md-8">
                    <div class="card-title mb-6">
                      <h3 class="fs-4 mb-2">{{ item.title }}</h3>
                      <time class="me-4">{{ $filters.dateUS(item.create_at) }}</time>
                      <span>{{ item.author }}</span>
                    </div>
                    <div class="card-text">
                      <p class="fw-light fs-6 fs-md-5 mb-6">
                        {{ item.description }}
                      </p>
                      <RouterLink
                        :to="`/articles/${item.id}`"
                        class="btn btn-primary border-2 rounded-3 text-white
                      fw-600 px-5 py-3 w-50"
                      >
                        閱讀更多
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.indexZoneImg {
  background-image: url('/images/hwpbj-9ejna.jpg');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .6);
  }
}

.borderColor {
  border: 1px solid rgba(0, 0, 0, 0.175);
}

.articleHeight {
  height: 350px;

  @media (min-width: 768px) {
    height: 450px;
  }
}
</style>
