<script>
import { Collapse } from 'bootstrap';
import FooterComponent from '@/components/FooterComponent.vue';
import FixedItems from '@/components/FixedItems.vue';

export default {
  data() {
    return {
      navCollapse: null,
    };
  },
  mounted() {
    this.navCollapse = new Collapse(this.$refs.navbarItem, {
      toggle: false,
    });
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
    <div class="container">
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

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarButton"
        aria-controls="navbarButton"
        aria-expanded="false"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        id="navbarButton"
        ref="navbarItem"
      >
        <ul class="navbar-nav text-center ms-auto">
          <li class="nav-item">
            <RouterLink
              to="/products"
              class="nav-link fs-5"
            >
              推薦行程
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/articles"
              class="nav-link fs-5"
            >
              最新文章
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink
              to="/about"
              class="nav-link fs-5"
            >
              關於我們
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
