<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '../stores/cartStore';

export default {
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
    handleScroll() {
      if (document.documentElement.scrollTop > 20) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
  },
  mounted() {
    this.getCart();
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapState(cartStore, ['cartCount']),
  },
};
</script>

<template>
  <div class="zIndex position-fixed end-2 bottom-4 text-center">
    <RouterLink
      to="/cart"
      class="fixedItem shadow bg-white pt-2 mb-3"
    >
      <i class="position-relative bi bi-cart-fill text-black fs-4 fs-md-3">
        <span class="position-absolute top-0 start-100 translate-middle
        badge rounded-pill bg-primary fs-8 fs-md-6">{{ cartCount
        }}
        </span></i>
    </RouterLink>
    <div
      v-if="isShow"
      class="fixedItem shadow bg-white pt-2"
      @click="scrollToTop"
    >
      <i class="bi bi-chevron-compact-up fs-4 fs-md-3"></i>
    </div>
  </div>
</template>

<style scoped>
.fixedItem {
  border-radius: 100%;
  cursor: pointer;
  width: 45px;
  height: 45px;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }

  @media (min-width: 992px) {
    width: 60px;
    height: 60px;
  }
}

.zIndex {
  z-index: 2000;
}
</style>
