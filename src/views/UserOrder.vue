<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';
import ProgressBar from '@/components/ProgressBar.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

const route = useRoute();

const order = ref({});
const isPaid = ref(false);
const progress = ref(50);

const getOrder = (orderId) => {
  axios
    .get(`${VITE_URL}/api/${VITE_PATH}/order/${orderId}`)
    .then((res) => {
      order.value = res.data.order;
      if (order.value.is_paid === true) {
        isPaid.value = true;
        progress.value = 100;
      }
    })
    .catch((err) => {
      store.setSweetMessageError(err.response.data.message);
      Swal.fire(store.sweetMessage);
    });
};

const payOrder = (orderId) => {
  axios
    .post(`${VITE_URL}/api/${VITE_PATH}/pay/${orderId}`)
    .then((res) => {
      if (res.data.success) {
        isPaid.value = true;
        progress.value = 100;
      }
    })
    .catch((err) => {
      store.setSweetMessageError(err.response.data.message);
      Swal.fire(store.sweetMessage);
    });
};

onMounted(() => {
  const { id } = route.params;
  getOrder(id);
});

</script>

<template>
  <main>
    <div class="container my-12">
      <ProgressBar :progress="progress" />
      <template v-if="isPaid">
        <div class="d-flex flex-column justify-content-center align-items-center mt-10">
          <h2 class="mb-8">付款完成</h2>
          <div>
            <RouterLink
              to="/"
              type="button"
              class="btn btnOutline border-2 rounded-3 fw-600 px-5 py-3 me-2"
            >
              返回首頁
            </RouterLink>
            <RouterLink
              to="/products"
              type="button"
              class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
            >
              繼續選購
            </RouterLink>
          </div>
        </div>
      </template>
      <template v-else>
        <h3 class="fs-4">訂單資訊</h3>
        <hr />
        <div class="row justify-content-center">
          <div class="col-md-7 mb-8 mb-md-0">
            <ul
              v-for="(product, index) in order.products"
              :key="index"
            >
              <li class="row mb-4">
                <div class="col-md-5">
                  <img
                    :src="product.product.imageUrl"
                    class="w-100"
                    style="height: 150px"
                    alt="product.product.title"
                  />
                </div>
                <div class="col-md-7">
                  <h2 class="fs-5 mt-5 mb-6">{{ product.product.title }}</h2>
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <div class="mb-1">價格：NT$
                        {{
                          parseInt(product.product.price)
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }} x {{ product.qty }}</div>
                      <div>小計：NT$
                        {{
                          parseInt(product.product.price * product.qty)
                            .toFixed(0)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        }}</div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="col-md-5">
            <ul
              class="d-flex flex-column justify-content-between
              border-top border-md-0 p-4 mb-9"
              v-if="order.user"
              style="height: 500px;"
            >
              <li class="fs-5">訂單編號：{{ order.id }}</li>
              <li class="fs-5">信箱：{{ order.user.email }}</li>
              <li class="fs-5">姓名：{{ order.user.name }}</li>
              <li class="fs-5">收件人電話：{{ order.user.tel }}</li>
              <li class="fs-5">收件人地址：{{ order.user.address }}</li>
              <li class="fs-5">訂單金額：{{ parseInt(order.total)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}</li>
              <li
                class="fs-5"
                v-if="!order.is_paid"
              >付款狀態：尚未付款</li>
              <li
                class="text-success fs-5"
                v-else
              >付款狀態：付款完成</li>
              <li class="fs-5">備註：{{ order.message }}</li>
            </ul>
            <button
              type="submit"
              class="btn btn-primary border-2
              rounded-3 text-white fw-600 px-5 py-3 ms-5 w-50"
              @click="payOrder(order.id)"
            >
              確認付款
            </button>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.btnOutline {
  border-color: #ff9b50;
  color: #ff9b50;

  &:hover {
    background-color: #ff9b50;
    color: white;
  }
}
</style>
