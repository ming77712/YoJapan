<script>
import { Collapse } from 'bootstrap';
import FixedItems from '../components/FixedItems.vue';

export default {
  data() {
    return {
      navCollapse: null,
    };
  },
  methods: {
  },
  mounted() {
    this.navCollapse = new Collapse(this.$refs.navbarItem, {
      toggle: false,
    });
  },
  components: {
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
        class="navbar-brand fs-3"
      ><img
          class="me-2"
          src="/images/yojapan-logo.svg"
          style="width: 40px; height: 40px;"
          alt="logo"
        >遊日本</RouterLink>

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
        </ul>
      </div>
    </div>
  </nav>
  <div>
    <RouterView />
  </div>
  <FixedItems />
</template>
