<script>
// import Swiper core and required modules
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

export default {
  data() {
    return {
      modules: [Pagination, EffectFade, Autoplay],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<template>
  <swiper
    :modules="modules"
    effect="fade"
    :slides-per-view="1"
    :pagination="{ clickable: true }"
    :autoplay="{
      delay: 5000,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide class="position-relative d-flex flex-column
     justify-content-center align-items-center">
      <img
        src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="bannerHeight w-100"
        alt=""
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-5 text-white fw-bold fs-5
          fs-md-4 fs-lg-3 p-1 p-md-2 p-lg-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
    <swiper-slide class="position-relative d-flex flex-column
     justify-content-center align-items-center">
      <img
        src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="bannerHeight w-100"
        alt=""
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-5 text-white fw-bold fs-5
          fs-md-4 fs-lg-3 p-1 p-md-2 p-lg-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
    <swiper-slide class="position-relative d-flex flex-column
     justify-content-center align-items-center">
      <img
        src="https://images.unsplash.com/photo-1672675964297-7910da4e13e7?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="bannerHeight w-100"
        alt=""
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-5 text-white fw-bold fs-5
          fs-md-4 fs-lg-3 p-1 p-md-2 p-lg-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
    <swiper-slide class="position-relative d-flex flex-column
     justify-content-center align-items-center">
      <img
        src="https://images.unsplash.com/photo-1703159506204-90a456211c20?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        class="bannerHeight w-100"
        alt=""
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-5 text-white fw-bold fs-5
          fs-md-4 fs-lg-3 p-1 p-md-2 p-lg-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.bannerTitle {
  background-color: rgba(66, 66, 66, 0.7);
  padding: 8px;

  @media (min-width: 768px) {
    padding: 12px;
  }

  @media (min-width: 992px) {
    padding: 16px;
  }
}

.bannerHeight {
  height: 400px;

  @media (min-width: 768px) {
    height: 600px;
  }

  @media (min-width: 992px) {
    height: 800px;
  }
}
</style>
