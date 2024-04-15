<script>
import categoryMixins from '@/mixins/category';
import { mapState, mapActions } from 'pinia';
import productsStore from '@/stores/productsStore';
import cartStore from '@/stores/cartStore';
import Pagination from '@/components/PaginationComponent.vue';

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
      <ul class="nav flex-column flex-md-row gap-4 mb-lg-12 mb-md-10 mb-8">
        <li class="navItem text-center">
          <router-link
            to="/products"
            class="nav-link fs-md-5 fs-6"
            :class="{ 'link-active': !$route.query.category }"
            style="background-image: url('https://images.unsplash.com/photo-1612104425262-6a5b6082a4ea?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
          >
            <span class="zindex-1 position-relative
              fs-md-5 fs-6 fw-bold text-white">全部</span></router-link>
        </li>
        <template
          v-for="item in category"
          :key="item"
        >
          <li class="navItem categoryBg text-center">
            <router-link
              :to="`/products?category=${item.name}`"
              class="nav-link"
              :class="{ 'link-active': $route.query.category === item.name }"
              :style="`background-image: url(${item.bgImage});`"
            >
              <span class="zindex-1 position-relative
              fs-md-5 fs-6 fw-bold text-white">{{ item.name }}</span></router-link>
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
                    <i class="bi bi-geo-alt-fill me-1"></i>{{ product.unit }}
                  </div>
                </div>
                <div class="card-body">
                  <h5
                    class="card-title mb-10"
                    style="height: 40px;"
                  >{{ product.title }}</h5>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">NT$ {{ parseInt(product.price).toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                    <button
                      type="button"
                      class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
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
  margin: 0 -1px -1px 0;
}

.nav-link {
  background-size: cover;
  background-position: center;
  text-align: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .7);
  }

  &:hover {
    &::before {
      background-color: rgba(0, 0, 0, .1);
      transition: 0.5s;
    }
  }

  &.link-active {
    &::before {
      background-color: rgba(0, 0, 0, .1);
    }
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
