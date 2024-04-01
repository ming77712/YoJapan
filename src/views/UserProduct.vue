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
          <div class="border-bottom mb-10">
            <h2 class="fs-11">
              {{ this.currentProduct.title }}
            </h2>
            <span class="d-block my-3 text-gray"><i class="bi bi-geo-alt-fill me-2"></i>{{
              this.currentProduct.category
            }}</span>
          </div>
          <div class="border-bottom pb-10">
            <p>{{ this.currentProduct.description }}</p>
          </div>
          <div class="rounded-5 bg-gray300 p-md-4 p-lg-6 mt-10">
            <div class="d-flex d-md-block flex-column align-items-center">
              <div class="fs-11 mb-1 mb-md-2">{{ parseInt(this.currentProduct.price).toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }} 元</div>
              <div class="fs-5 mb-2 mb-md-6">原價 <del>
                  {{ parseInt(this.currentProduct.origin_price).toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</del> 元</div>
              <div class="d-md-flex mb-2">
                <div class="d-flex me-5 mb-2 mb-md-0">
                  <button
                    type="button"
                    class="borderRounded me-2"
                    @click.prevent="subQty()"
                    :disabled="qty === 1"
                  >
                    <i class="bi bi-dash fs-4"></i>
                  </button>
                  <input
                    type="number"
                    class="form-control border-0 fs-4 me-2"
                    style="width: 80px;"
                    min="1"
                    :value="qty"
                    readonly
                  />
                  <button
                    type="button"
                    class="borderRounded"
                    @click.prevent="addQty()"
                    :disabled="qty === 20"
                  >
                    <i class="bi bi-plus fs-4"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  style="width: 200px;"
                  @click.prevent="
                    addToCart(this.currentProduct.id, this.$router.push, this.qty)
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
  border-radius: 100%;
}
</style>
