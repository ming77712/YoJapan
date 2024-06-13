<script setup>
import useAdminStore from '@/stores/adminStore';

const store = useAdminStore();
</script>

<template>
  <footer>
    <hr>
    <div class="container">
      <div class="text-center p-2">
        <p class="d-inline me-2">本網站僅供個人作品使用，不做任何商業使用</p>
        <RouterLink
          to="/admin/products"
          class="text-black fs-8"
          v-if="store.status"
        ><i class="bi bi-person-fill-gear"></i></RouterLink>
        <RouterLink
          to="/login"
          class="text-black fs-8"
          v-else
        ><i class="bi bi-person-fill-gear"></i></RouterLink>
      </div>
    </div>
  </footer>
</template>
