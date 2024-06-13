<script setup>
import { ref } from 'vue';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

const modules = ref([Pagination, EffectFade, Autoplay]);
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
        src="/images/bannerswiper/photo-1493976040374-85c8e12f0c0e.avif"
        class="bannerHeight w-100"
        alt="banner-pic-01"
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
    <swiper-slide class="position-relative d-flex flex-column
     justify-content-center align-items-center">
      <img
        src="/images/bannerswiper/photo-1524413840807-0c3cb6fa808d.avif"
        class="bannerHeight w-100"
        alt="banner-pic-02"
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
    <swiper-slide class="position-relative d-flex flex-column
     justify-content-center align-items-center">
      <img
        src="/images/bannerswiper/photo-1672675964297-7910da4e13e7.avif"
        class="bannerHeight w-100"
        alt="banner-pic-03"
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
    <swiper-slide class="position-relative d-flex flex-column
     justify-content-center align-items-center">
      <img
        src="/images/bannerswiper/photo-1703159506204-90a456211c20.avif"
        class="bannerHeight w-100"
        alt="banner-pic-04"
      />
      <div class="bannerTitle d-flex flex-column align-items-center position-absolute top-40">
        <h2 class="text-white fs-3 fs-md-11 fs-lg-2 mb-3">探索日本</h2>
        <h3 class="text-white fs-5 fs-md-4 fs-lg-3 mb-5">
          輕鬆規劃行程與預訂觀光票券，讓您的旅程充滿樂趣與便利
        </h3>
        <RouterLink
          to="/products"
          class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
        >
          快來探索
        </RouterLink>
      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
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
