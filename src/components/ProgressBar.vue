<script>
export default {
  props: ['progress'],
  data() {
    return {
      currentProgress: 0,
    };
  },
  mounted() {
    this.currentProgress = this.progress;
  },
  watch: {
    progress() {
      this.currentProgress = this.progress;
    },
  },
};
</script>

<template>
  <div
    class="position-relative mx-auto my-14"
    style="height: 30px; max-width: 900px; width: 90%"
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
      class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
      style="width: 2rem; height: 2rem"
    >
      1
    </div>
    <p class="position-absolute top-100 start-0 translate-middle">填寫資料</p>
    <div
      class="position-absolute top-0 start-50 translate-middle btn btn-sm rounded-pill"
      :class="currentProgress >= 50 ? 'btn-primary' : 'btn-gray300'"
      style="width: 2rem; height: 2rem"
    >
      2
    </div>
    <p class="position-absolute top-100 start-50 translate-middle">付款資訊</p>
    <div
      class="position-absolute top-0 start-100 translate-middle btn btn-sm rounded-pill"
      :class="currentProgress >= 100 ? 'btn-primary' : 'btn-gray300'"
      style="width: 2rem; height: 2rem"
    >
      3
    </div>
    <p class="position-absolute top-100 start-100 translate-middle text-nowrap">
      完成訂單
    </p>
  </div>
</template>

<style lang="scss" scoped></style>
