<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isShow = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const handleScroll = () => {
  if (document.documentElement.scrollTop > 20) {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    v-if="isShow"
    class="fixedItem zindex-2000 position-fixed end-2 bottom-4 text-center shadow bg-white pt-1"
    @click="scrollToTop"
  >
    <i class="bi bi-chevron-compact-up fs-4"></i>
  </div>
</template>

<style scoped>
.fixedItem {
  border-radius: 100%;
  cursor: pointer;
  width: 45px;
  height: 45px;
}

.zindex-2000 {
  z-index: 2000;
}
</style>
