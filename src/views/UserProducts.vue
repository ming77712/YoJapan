<script>
import categoryMixins from '@/mixins/category';
import { mapState, mapActions } from 'pinia';
import productsStore from '../stores/productsStore';
import cartStore from '../stores/cartStore';
import Pagination from '../components/PaginationComponent.vue';

export default {
  mixins: [categoryMixins],
  data() {
    return {

    };
  },
  methods: {
    ...mapActions(productsStore, ['getAllProduct']),
    ...mapActions(cartStore, ['addToCart']),
  },
  mounted() {
    this.getAllProduct(this.$route.query.category);
  },
  computed: {
    ...mapState(productsStore, ['products', 'pagination']),
    ...mapState(cartStore, ['carts', 'loadingStatus']),
  },
  components: {
    Pagination,
  },
  watch: {
    '$route.query': {
      handler(current) {
        this.getAllProduct(current.category);
      },
      deep: true,
    },
  },
};
</script>

<template>
  <main class="py-lg-12 py-md-10 py-8">
    <h2 class="text-center fs-lg-11 fs-md-3 fs-4 mb-lg-12 mb-md-10 mb-8">推薦行程</h2>
    <div class="container">
      <ul class="nav flex-column flex-md-row mb-lg-12 mb-md-10 mb-8">
        <li class="navItem text-center mb-2 mb-md-0">
          <router-link
            to="/products"
            class="nav-link fs-md-5 fs-6"
            :class="{ 'link-active': !$route.query.category }"
          >
            全部</router-link>
        </li>
        <template
          v-for="item in category"
          :key="item"
        >
          <li class="navItem text-center mb-2 mb-md-0">
            <router-link
              :to="`/products?category=${item}`"
              class="nav-link fs-md-5 fs-6"
              :class="{ 'link-active': $route.query.category === item }"
            >
              {{ item }}</router-link>
          </li>
        </template>
      </ul>
      <ul class="row g-4 g-md-5 g-lg-6">
        <template
          v-for="(product, index) in products"
          :key="index"
        >
          <li class="col-md-6 col-lg-4">
            <RouterLink
              :to="`/products/${product.id}`"
              class="zoomIn w-100"
            >
              <div class="position-relative card rounded-0">
                <div class="card-top overflow-hidden">
                  <img
                    :src="product.imageUrl"
                    class="productImgHeight w-100"
                    :alt="product.title"
                  />
                  <div class="position-absolute d-inline top-0 end-0
                badge rounded-0 bg-white text-black">
                    <i class="bi bi-geo-alt-fill me-1"></i>{{ product.category }}
                  </div>
                </div>
                <div class="card-body">
                  <h5
                    class="card-title mb-10"
                    style="height: 40px;"
                  >{{ product.title }}</h5>
                  <div class="d-flex justify-content-between">
                    <span class="fs-4">$ {{ parseInt(product.price).toFixed(0)
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
          </li>
        </template>
      </ul>
    </div>
    <pagination
      :pages="pagination"
      @change-page="(page) => getAllProduct(pagination.category, page)"
    ></pagination>
  </main>
</template>

<style lang="scss" scoped>
.navItem {
  flex-grow: 1;
  border: 1px solid black;
  margin: 0 -1px -1px 0
}

.nav-link {
  text-align: center;

  &.link-active {
    background-color: #ff5b00;
    color: white;
    font-weight: bold;
  }

  &:hover {
    background-color: #ff5b00;
    color: white;
    font-weight: bold;
  }
}

.productImgHeight {
  height: 200px;

  @media (min-width: 768px) {
    height: 250px;
  }

  @media (min-width: 992px) {
    height: 300px;
  }

}
</style>
