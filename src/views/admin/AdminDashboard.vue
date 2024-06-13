<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import useAdminStore from '@/stores/adminStore';
import NavSidebar from '@/components/admin/NavSidebar.vue';

const router = useRouter();

const store = useAdminStore();

onMounted(() => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
  axios.defaults.headers.common.Authorization = token;
  store.checkLogin(router.push);
});
</script>

<template>
  <NavSidebar></NavSidebar>
  <div class="ms-74">
    <div class="d-flex justify-content-end bg-white p-3">
      <a
        href="#"
        class="fs-5"
        @click.prevent="store.logout(router.push)"
      ><i class="bi bi-box-arrow-right me-2"></i>登出</a>
    </div>
    <div class="container-fluid">
      <RouterView v-if="store.status" />
    </div>
  </div>
</template>
