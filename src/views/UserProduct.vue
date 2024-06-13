<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import useProductsStore from '@/stores/productsStore';
import useCartStore from '@/stores/cartStore';
import ProductDetailSwiper from '@/components/ProductDetailSwiper.vue';
import RecommendProducts from '@/components/RecommendProducts.vue';

const productsStore = useProductsStore();
const cartStore = useCartStore();

const route = useRoute();

const qty = ref(1);

const addQty = () => {
  if (qty.value < 20) qty.value += 1;
};

const subQty = () => {
  if (qty.value > 1) qty.value -= 1;
};

onMounted(() => {
  const { id } = route.params;
  productsStore.getProduct(id);
});

watch(
  () => route.params,
  (changeParams) => {
    const { id } = changeParams;
    productsStore.getProduct(id);
  },
  { deep: true },
);
</script>

<template>
  <main class="py-lg-12 py-md-10 py-8">
    <div class="container">
      <nav
        class="mb-6"
        aria-label="breadcrumb"
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <RouterLink to="/products">推薦行程</RouterLink>
          </li>
          <li
            class="breadcrumb-item active"
            aria-current="page"
          >{{ productsStore.currentProduct.title }}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-6 col-xl-7 mb-4 mb-md-0">
          <ProductDetailSwiper :images="productsStore.currentProduct.imagesUrl">
          </ProductDetailSwiper>
        </div>
        <div class="col-md-6 col-xl-5">
          <div class="mb-6">
            <h2 class="fs-11 mb-2">
              {{ productsStore.currentProduct.title }}
            </h2>
            <span class="d-block text-gray"><i class="bi bi-geo-alt-fill me-2"></i>{{
              productsStore.currentProduct.unit
            }}</span>
          </div>
          <div class="pb-5 pb-md-10">
            <p>{{ productsStore.currentProduct.description }}</p>
          </div>
          <div class="d-flex d-md-block flex-column align-items-center">
            <div class="fs-11 mb-1 mb-md-2">
              NT$ {{ parseInt(productsStore.currentProduct.price).toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</div>
            <div class="fs-5 mb-2 mb-md-6">原價 NT$ <del>
                {{ parseInt(productsStore.currentProduct.origin_price).toFixed(0)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</del></div>
            <div class="p-2 p-md-4 mt-4 mt-md-10">
              <div class="d-flex flex-column flex-lg-row align-items-center">
                <div class="d-flex justify-content-between align-items-center
                gap-2 me-lg-5 mb-6 mb-lg-0">
                  <button
                    type="button"
                    class="border-0 bg-transparent"
                    @click.prevent="subQty()"
                    :disabled="qty === 1"
                  >
                    <i class="bi bi-dash fs-4"></i>
                  </button>
                  <input
                    type="text"
                    class="form-control border-0 text-center fs-4 p-0"
                    min="1"
                    :value="qty"
                    style="width: 80px;"
                    readonly
                  />
                  <button
                    type="button"
                    class="border-0 bg-transparent"
                    @click.prevent="addQty()"
                    :disabled="qty === 20"
                  >
                    <i class="bi bi-plus fs-4"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
                  style="width: 200px;"
                  @click.prevent="
                    cartStore.addToCart(productsStore.currentProduct.id, qty)
                    "
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="mb-10">
      <h3 class="mb-4">其他行程推薦</h3>
      <RecommendProducts :pick-products="productsStore.randomProducts" />
    </div>
  </main>
</template>
