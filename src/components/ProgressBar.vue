<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps(['progress']);

const currentProgress = ref(0);

onMounted(() => {
  currentProgress.value = props.progress;
});

watch(
  () => props.progress,
  () => {
    currentProgress.value = props.progress;
  },
);
</script>

<template>
  <div
    class="position-relative mx-auto my-14"
    style="height: 30px; max-width: 800px; width: 90%"
  >
    <div
      class="progress"
      style="height: 1px"
    >
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: currentProgress + '%' }"
        aria-valuenow="50"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
    <div
      class="position-absolute top-0 start-0 translate-middle
      btn btn-sm btn-primary rounded-pill text-white"
      style="width: 2rem; height: 2rem"
    >
      1
    </div>
    <p class="position-absolute top-100 start-0 translate-middle fs-8 fs-md-6">填寫資料</p>
    <div
      class="position-absolute top-0 start-50 translate-middle
      btn btn-sm rounded-pill text-white"
      :class="currentProgress >= 50 ? 'btn-primary' : 'btn-gray300'"
      style="width: 2rem; height: 2rem"
    >
      2
    </div>
    <p class="position-absolute top-100 start-50 translate-middle
    fs-8 fs-md-6">付款資訊</p>
    <div
      class="position-absolute top-0 start-100 translate-middle
      btn btn-sm rounded-pill text-white"
      :class="currentProgress >= 100 ? 'btn-primary' : 'btn-gray300'"
      style="width: 2rem; height: 2rem"
    >
      3
    </div>
    <p class="position-absolute top-100 start-100 translate-middle text-nowrap fs-8 fs-md-6">
      完成訂單
    </p>
  </div>
</template>
