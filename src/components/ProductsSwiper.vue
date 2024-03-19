<script>
// import Swiper core and required modules
import { Navigation } from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

import { mapState, mapActions } from 'pinia';
import productsStore from '../stores/productsStore';
import cartStore from '../stores/cartStore';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

export default {
  data() {
    return {
      modules: [Navigation],
    };
  },
  methods: {
    ...mapActions(productsStore, ['getAllProduct']),
    ...mapActions(cartStore, ['addToCart']),
  },
  mounted() {
    this.getAllProduct();
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    ...mapState(productsStore, ['products']),
  },
};
</script>

<template>
  <swiper
    :modules="modules"
    :slides-per-view="4"
    :space-between="12"
    :loop="true"
    :breakpoints="{
      992: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
    }"
    navigation
  >
    <swiper-slide
      class="
    d-flex
    flex-column
    justify-content-center
    align-items-center
    mt-3"
      v-for="(product, index) in   products  "
      :key="index"
    >
      <RouterLink
        :to="`/products/${product.id}`"
        class="cardAnimated"
      >
        <div
          class="productsImg position-relative card rounded-0"
          style="width: 300px"
        >
          <img
            :src="product.imageUrl"
            class=""
            style="height: 200px;"
            :alt="product.title"
          />
          <div class="position-absolute d-inline top-0 end-0 badge rounded-0 bg-white text-black">
            <i class="bi bi-geo-alt-fill me-1"></i>{{ product.category }}
          </div>
          <div class="card-body">
            <h5
              class="card-title mb-10"
              style="height: 40px;"
            >{{ product.title }}</h5>
            <div class="d-flex justify-content-between">
              <span class="fs-4">$ {{ product.price.toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="
                  addToCart(product.id)
                  "
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </RouterLink>
    </swiper-slide>
  </swiper>
</template>

<style lang="scss" scoped>
.productsImg {
  width: 80px;

  @media (min-width: 768px) {
    width: 140px;
  }

  @media (min-width: 992px) {
    width: 170px;
  }

  @media (min-width: 1200px) {
    width: 200px;
  }

}

.cardAnimated:hover {
  transform: translateY(-10px);
}

/* .swiper-button-prev {
}

.swiper-button-next {
}
*/

.swiper-button-prev:after,
.swiper-rtl .swiper-button-next:after {
  content: 'prev';
  color: white;
}

.swiper-button-next:after,
.swiper-rtl .swiper-button-prev:after {
  content: 'next';
  color: white;
}
</style>
