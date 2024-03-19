<script>
import axios from 'axios';
import { mapState, mapActions } from 'pinia';
import adminStore from '../../stores/adminStore';
import NavSidebar from '../../components/admin/NavSidebar.vue';

export default {
  methods: {
    ...mapActions(adminStore, ['checkLogin', 'logout']),
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    axios.defaults.headers.common.Authorization = token;
    this.checkLogin(this.$router.push);
  },
  computed: {
    ...mapState(adminStore, ['status']),
  },
  components: {
    NavSidebar,
  },
};
</script>

<template>
  <NavSidebar></NavSidebar>
  <div class="ms-74">
    <div class="d-flex justify-content-end bg-white p-3">
      <a
        href="#"
        class="fs-5"
        @click.prevent="logout(this.$router.push)"
      ><i class="bi bi-box-arrow-right me-2"></i>登出</a>
    </div>
    <div class="container-fluid">
      <RouterView v-if="status" />
    </div>
  </div>
</template>
