<script setup>
import { ref, onMounted } from 'vue';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import useProductsStore from '@/stores/productsStore';
import useCartStore from '@/stores/cartStore';
import 'swiper/css';
import 'swiper/css/navigation';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const modules = ref([Navigation]);

onMounted(() => {
  productsStore.getIndexProduct();
});
</script>

<template>
  <swiper
    :modules="modules"
    :space-between="40"
    :loop="true"
    :breakpoints="{
      1400: {
        slidesPerView: 4
      },
      992: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      0: {
        slidesPerView: 1
      }
    }"
    :navigation="{
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }"
  >
    <swiper-slide
      class="
    d-flex
    flex-column
    justify-content-center
    align-items-center
    mt-5"
      v-for="(product, index) in productsStore.allProduct"
      :key="index"
    >
      <RouterLink
        :to="`/products/${product.id}`"
        class="cardAnimated"
      >
        <div
          class="position-relative card rounded-0"
          style="width: 300px;"
        >
          <img
            :src="product.imageUrl"
            style="height: 200px;"
            :alt="product.title"
          />
          <div class="position-absolute d-inline top-0 end-0 badge rounded-0 bg-white text-black">
            <i class="bi bi-geo-alt-fill me-1"></i>{{ product.unit }}
          </div>
          <div class="card-body">
            <h5
              class="card-title mb-10"
              style="height: 40px;"
            >{{ product.title }}</h5>
            <div class="d-flex justify-content-between align-items-center">
              <span class="fs-4">NT$ {{ product.price.toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
              <button
                type="button"
                class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
                @click.prevent="
                  cartStore.addToCart(product.id)
                  "
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </RouterLink>
    </swiper-slide>
    <div class="swiper-button-prev"><i class="bi bi-arrow-left-square-fill
    text-gray300 fs-11"></i></div>
    <div class="swiper-button-next"><i class="bi bi-arrow-right-square-fill
    text-gray300 fs-11"></i></div>
  </swiper>
</template>

<style lang="scss" scoped>
.cardAnimated:hover {
  transform: translateY(-10px);
}

.swiper {

  &-button-prev:after,
  &-button-next:after {
    content: '';
  }
}
</style>
