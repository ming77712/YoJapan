<script>
import { mapState, mapActions } from 'pinia';
import BannerSwiper from '../components/BannerSwiper.vue';
import ProductsSwiper from '../components/ProductsSwiper.vue';
import FooterComponent from '../components/FooterComponent.vue';
import FixedItems from '../components/FixedItems.vue';
import articlesStore from '../stores/articlesStore';

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
    FooterComponent,
    FixedItems,
  },
};
</script>

<template>
  <main>
    <BannerSwiper />
    <section class="mt-18">
      <div class="container">
        <h2 class="fs-3 mb-2">熱門地區</h2>
        <div class="row mb-3">
          <div class="col-8 g-0">
            <img
              src="https://images.unsplash.com/photo-1526193439956-0d961851d084?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="w-100"
              style="height: 200px;"
              alt="Tokyo-image"
            >
          </div>
          <div class="col-4 d-flex flex-column justify-content-center
           align-items-center border">
            <h3>東京</h3>
            <p class="text-center mb-2">魅力無限！摩天大樓、繁華街道、流行文化，還有美食天堂，24小時都充滿著活力！</p>
            <RouterLink
              to="/products?category=東京"
              class="btn btn-primary border-2 rounded-5 fw-bold fs-5"
            >
              立即前往
            </RouterLink>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4 d-flex flex-column justify-content-center
           align-items-center border">
            <h3>大阪</h3>
            <p class="text-center mb-2">熱情似火！美食之都，不僅有美味的壽司和燒肉，還有獨特的文化和歷史，人們總是笑容滿面！</p>
            <RouterLink
              to="/products?category=大阪"
              class="btn btn-primary border-2 rounded-5 fw-bold fs-5"
            >
              立即前往
            </RouterLink>
          </div>
          <div class="col-8 g-0">
            <img
              src="https://images.unsplash.com/photo-1560291544-515e5417bddb?q=80&w=2642&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="w-100"
              style="height: 200px;"
              alt="Osaka-image"
            >
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-8 g-0">
            <img
              src="https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="w-100"
              style="height: 200px;"
              alt="Kyoto-image"
            >
          </div>
          <div class="col-4 d-flex flex-column justify-content-center
           align-items-center border">
            <h3>京都</h3>
            <p class="text-center mb-2">神秘浪漫！古老的寺廟、傳統的茶室、美麗的花園，處處都充滿著日本的傳統美學和宗教氛圍！</p>
            <RouterLink
              to="/products?category=京都"
              class="btn btn-primary border-2 rounded-5 fw-bold fs-5"
            >
              立即前往
            </RouterLink>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-4 d-flex flex-column justify-content-center
           align-items-center border">
            <h3>北海道</h3>
            <p class="text-center mb-2">大自然的樂園！絕美的風景、新鮮的海鮮、冬季的滑雪勝地，無論何時都能讓人心曠神怡！</p>
            <RouterLink
              to="/products?category=北海道"
              class="btn btn-primary border-2 rounded-5 fw-bold fs-5"
            >
              立即前往
            </RouterLink>
          </div>
          <div class="col-8 g-0">
            <img
              src="https://images.unsplash.com/photo-1682594400910-b3477570b4a4?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              class="w-100"
              style="height: 200px;"
              alt="Hokkaido-image"
            >
          </div>
        </div>
      </div>
    </section>
    <section class="indexZoneImg mt-18 py-15">
      <div class="container">
        <div class="row">
          <div class="zIndex col-4 p-8">
            <div class="text-center border border-white py-2">
              <img
                src="../../public/images/ticket.svg"
                alt="ticket"
                style="height: 100px; width: 100px;"
              >
              <p class="text-white fs-4 mt-3">門票預訂</p>
            </div>
          </div>
          <div class="zIndex col-4 p-8">
            <div class="text-center border border-white py-2">
              <img
                src="../../public/images/plan.svg"
                style="height: 100px; width: 100px;"
                alt="plan"
              >
              <p class="text-white fs-4 mt-3">行程安排</p>
            </div>
          </div>
          <div class="zIndex col-4 p-8">
            <div class="text-center border border-white py-2">
              <img
                src="../../public/images/book-online-rounded.svg"
                style="height: 100px; width: 100px;"
                alt="book-online"
              >
              <p class="text-white fs-4 mt-3">線上完成</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="mt-18">
      <div class="container">
        <h2 class="fs-3 mb-2">行程瀏覽</h2>
        <ProductsSwiper />
      </div>
    </section>
    <section class="mt-18">
      <div class="container">
        <h2 class="fs-3 mb-2">最新文章</h2>
        <ul class="mb-10 mb-md-20">
          <template
            v-for="(item, index) in articles"
            :key="item.id"
          >
            <li
              class="zoomIn row justify-content-center mb-4 mb-md-9"
              v-if="index % 2 !== 0"
            >
              <div class="col-12 col-lg-6">
                <RouterLink
                  :to="`/articles/${item.id}`"
                  class=""
                >
                  <div
                    class="card mb-4 mb-md-0"
                    style="height: 280px;"
                  >
                    <div class="card-body p-4 p-md-8">
                      <div class="card-title mb-6">
                        <h3 class="fs-4 mb-2">{{ item.title }}</h3>
                        <time class="me-4">{{ $filters.dateUS(item.create_at) }}</time>
                        <span class="">{{ item.author }}</span>
                      </div>
                      <div class="card-text">
                        <p class="fw-light fs-5">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </div>
              <div class="col-12 col-lg-6">
                <RouterLink
                  :to="`/articles/${item.id}`"
                  class="overflow-hidden w-100"
                >
                  <img
                    class="d-none d-md-block w-100"
                    :src="item.imageUrl"
                    style="height: 280px;"
                    alt=""
                  />
                  <img
                    class="d-block d-md-none w-100 img-fluid"
                    :src="item.imageUrl"
                    style="height: 280px;"
                    alt=""
                  />
                </RouterLink>
              </div>
            </li>
            <li
              class="zoomIn row justify-content-center mb-4 mb-md-9"
              v-else
            >
              <div class="col-12 col-lg-6">
                <RouterLink
                  :to="`/articles/${item.id}`"
                  class="overflow-hidden w-100"
                >
                  <img
                    class="d-none d-md-block w-100"
                    :src="item.imageUrl"
                    style="height: 280px;"
                    alt=""
                  />
                  <img
                    class="d-block d-md-none w-100 img-fluid"
                    :src="item.imageUrl"
                    style="height: 280px;"
                    alt=""
                  />
                </RouterLink>
              </div>
              <div class="col-12 col-lg-6">
                <RouterLink
                  :to="`/articles/${item.id}`"
                  class=""
                >
                  <div
                    class="card mb-4 mb-md-0"
                    style="height: 280px;"
                  >
                    <div class="card-body p-4 p-md-8">
                      <div class="card-title mb-6">
                        <h3 class="fs-4 mb-2">{{ item.title }}</h3>
                        <time class="me-4">{{ $filters.dateUS(item.create_at) }}</time>
                        <span class="">{{ item.author }}</span>
                      </div>
                      <div class="card-text">
                        <p class="fw-light fs-5">
                          {{ item.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </section>
    <FooterComponent />
    <FixedItems />
  </main>
</template>

<style lang="scss" scoped>
.indexZoneImg {
  background-image: url('https://images.unsplash.com/photo-1593955808003-93f6151e6028?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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

.zIndex {
  z-index: 1;
}
</style>
