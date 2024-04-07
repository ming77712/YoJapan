<script>
import { mapState, mapActions } from 'pinia';
import productsStore from '@/stores/productsStore';
import cartStore from '@/stores/cartStore';
import ProductDetailSwiper from '@/components/ProductDetailSwiper.vue';
import RecommendProducts from '@/components/RecommendProducts.vue';

export default {
  data() {
    return {
      qty: 1,
    };
  },
  methods: {
    ...mapActions(productsStore, ['getProduct']),
    ...mapActions(cartStore, ['addToCart']),
    addQty() {
      if (this.qty < 20) this.qty += 1;
    },
    subQty() {
      if (this.qty > 1) this.qty -= 1;
    },
  },
  mounted() {
    const { id } = this.$route.params;
    this.getProduct(id);
  },
  watch: {
    '$route.params': {
      handler(changeParams) {
        const { id } = changeParams;
        this.getProduct(id);
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(productsStore, ['currentProduct', 'randomProducts']),
    ...mapState(cartStore, ['carts']),
  },
  components: {
    ProductDetailSwiper,
    RecommendProducts,
  },
};
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
          >{{ this.currentProduct.title }}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-6 col-xl-7 mb-4 mb-md-0">
          <ProductDetailSwiper :images="this.currentProduct.imagesUrl"></ProductDetailSwiper>
        </div>
        <div class="col-md-6 col-xl-5">
          <div class="mb-6">
            <h2 class="fs-11 mb-2">
              {{ this.currentProduct.title }}
            </h2>
            <span class="d-block text-gray"><i class="bi bi-geo-alt-fill me-2"></i>{{
              this.currentProduct.unit
            }}</span>
          </div>
          <div class="pb-5 pb-md-10">
            <p>{{ this.currentProduct.description }}</p>
          </div>
          <div class="d-flex d-md-block flex-column align-items-center">
            <div class="fs-11 mb-1 mb-md-2">NT$ {{ parseInt(this.currentProduct.price).toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</div>
            <div class="fs-5 mb-2 mb-md-6">原價 NT$ <del>
                {{ parseInt(this.currentProduct.origin_price).toFixed(0)
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
                    addToCart(this.currentProduct.id, this.qty)
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
      <RecommendProducts :pick-products="randomProducts" />
    </div>
  </main>
</template>

<style scoped>
.borderRounded {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
</style>
