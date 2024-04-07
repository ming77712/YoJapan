<script>
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export default {
  props: ['images'],
  data() {
    return {
      imagesLength: 0,
      thumbsSwiper: { value: null },
      modules: [Navigation, FreeMode, Thumbs],
    };
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper.value = swiper;
    },
  },
  computed: {
    // 計算哪個投影是被選到的
    activeSlideIndex() {
      if (this.thumbsSwiper.value) {
        return this.thumbsSwiper.value.realIndex;
      }
      return 0;
    },
  },
  watch: {
    images() {
      this.imagesLength = this.images.length;
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
};
</script>

<template>
  <swiper
    :thumbs="{ swiper: thumbsSwiper.value }"
    :modules="modules"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
    class="mb-6"
  >
    <swiper-slide
      class="swiper-slide-thumb-active"
      v-for="(image, index) in images"
      :key="index"
    >
      <img
        class="grab w-100"
        :src="image"
        alt="thumb-active-pic"
        style="height: 400px; "
      />
    </swiper-slide>
    <div class="swiper-button-prev"><i class="bi bi-arrow-left-square-fill
    text-gray300 fs-10"></i></div>
    <div class="swiper-button-next"><i class="bi bi-arrow-right-square-fill
    text-gray300 fs-10"></i></div>
  </swiper>

  <swiper
    @swiper="setThumbsSwiper"
    :spaceBetween="10"
    :slidesPerView="imagesLength"
    :freeMode="true"
    :watchSlidesProgress="true"
    :modules="modules"
  >
    <swiper-slide
      :class="{ 'swiper-slide-thumb-active': activeSlideIndex === index }"
      v-for="(image, index) in images"
      :key="index"
    >
      <img
        class="pointer w-100"
        :src="image"
        alt="thumb-pic"
        style="height: 100px;"
      />
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.swiper {

  &-button-prev:after,
  &-button-next:after {
    content: '';
  }
}

.swiper-slide {
  opacity: 0.4;
}

.swiper-slide-thumb-active {
  opacity: 1;
}

.pointer {
  cursor: pointer;
}

.grab {
  cursor: grab;
}
</style>
