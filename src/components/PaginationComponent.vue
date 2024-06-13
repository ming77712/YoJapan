<script setup>
const props = defineProps(['pages']);

const emit = defineEmits(['change-page']);

const changePage = (page) => {
  emit('change-page', page);
};
</script>

<template>
  <nav
    class="d-flex justify-content-center mt-4"
    aria-label="Page navigation"
  >
    <ul class="pagination">
      <li
        class="page-item"
        :class="{ 'disabled': props.pages.current_page === 1 }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="changePage(props.pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="(item, index) in props.pages.total_pages"
        :key="index"
        class="page-item"
        :class="{ 'active': item === props.pages.current_page }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="changePage(item)"
        >{{ item }}</a>
      </li>
      <li
        class="page-item"
        :class="{ 'disabled': props.pages.current_page === props.pages.total_pages }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="changePage(props.pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
