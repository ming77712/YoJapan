<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
  props: ['pickProducts'],
  data() {
    return {};
  },
  methods: {
    ...mapActions(cartStore, ['addToCart']),
  },
  mounted() {
  },
};
</script>

<template>
  <ul class="row g-3 g-md-4 g-lg-5">
    <template
      v-for="(product, index) in pickProducts"
      :key="index"
    >
      <li class="col-md-6 col-lg-3">
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
              <div class="position-absolute d-inline top-0 end-0 badge
              rounded-0 bg-white text-black">
                <i class="bi bi-geo-alt-fill me-1"></i>{{ product.unit }}
              </div>
            </div>
            <div class="card-body">
              <h5
                class="card-title mb-10"
                style="height: 60px"
              >
                {{ product.title }}
              </h5>
              <div class="d-flex justify-content-between">
                <span class="fs-5 fs-xl-4">NT$
                  {{
                    parseInt(product.price)
                      .toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }}</span>
                <button
                  type="button"
                  class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
                  @click.prevent="addToCart(product.id)"
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
</template>

<style lang="scss" scoped>
.productImgHeight {
  height: 200px;

  @media (min-width: 768px) {
    height: 200px;
  }

  @media (min-width: 992px) {
    height: 200px;
  }

}
</style>
