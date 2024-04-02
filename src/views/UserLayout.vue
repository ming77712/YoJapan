<script>
import { Collapse } from 'bootstrap';
import FooterComponent from '@/components/FooterComponent.vue';
import FixedItems from '@/components/FixedItems.vue';
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
  data() {
    return {
      navCollapse: null,
    };
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
  },
  mounted() {
    this.getCart();
    this.navCollapse = new Collapse(this.$refs.navbarItem, {
      toggle: false,
    });
  },
  computed: {
    ...mapState(cartStore, ['cartCount']),
  },
  components: {
    FooterComponent,
    FixedItems,
  },
};
</script>

<template>
  <nav
    class="sticky-top navbar navbar-expand-md shadow-sm"
    style="background-color: #f8f8f8;"
  >
    <div class="container d-flex justify-content-between  align-items-center">
      <RouterLink
        to="/"
        class="navbar-brand d-flex align-items-center"
      ><img
          class="me-2"
          src="/images/yojapan-logo.svg"
          style="width: 40px; height: 40px;"
          alt="logo"
        >
        <h1 class="fs-3">遊日本</h1>
      </RouterLink>

      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler me-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarButton"
          aria-controls="navbarButton"
          aria-expanded="false"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <RouterLink
          to="/cart"
          class="d-block d-md-none me-3"
        >
          <i class="cartIconMobile position-relative bi bi-cart-fill text-black">
            <span class="position-absolute top-0 start-100 translate-middle
          badge rounded-pill bg-primary fs-8">{{ cartCount
          }}
            </span></i>
        </RouterLink>
      </div>
      <div
        class="collapse navbar-collapse"
        id="navbarButton"
        ref="navbarItem"
      >
        <ul class="navbar-nav text-center ms-auto">
          <li class="nav-item">
            <RouterLink
              to="/products"
              class="nav-link"
            >
              推薦行程
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/articles"
              class="nav-link"
            >
              最新文章
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/about"
              class="nav-link"
            >
              關於我們
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/cart"
              class="d-none d-md-block nav-link"
            >
              <i class="position-relative bi bi-cart-fill">
                <span
                  class="position-absolute top-0 start-100 translate-middle
                  badge rounded-pill bg-primary"
                  :class="cartCount === 0 ? 'd-none' : 'd-block'"
                >{{ cartCount
                }}
                </span></i>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <RouterView />
  <FixedItems />
  <FooterComponent />
</template>

<style>
.cartIconMobile {
  font-size: 30px;
}
</style>
