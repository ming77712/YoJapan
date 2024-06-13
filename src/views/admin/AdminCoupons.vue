<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';
import CouponModal from '@/components/admin/CouponModal.vue';
import DelModal from '@/components/admin/DelModal.vue';
import Pagination from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

const store = useSweetMessageStore();

const currentCoupon = ref({
  title: '',
  is_enabled: 0,
  percent: 100,
  code: '',
});
const allCoupon = ref({});
const isNew = ref(false);
const currentPagination = ref({});
const currentPage = ref(1);
const couponModal = ref(null);
const delModal = ref(null);

const openCouponModal = (state, item) => {
  isNew.value = state;
  if (isNew.value) {
    currentCoupon.value = {
      due_date: new Date().getTime() / 1000,
    };
  } else {
    currentCoupon.value = { ...item };
  }
  couponModal.value.openModal();
};

const openDelCouponModal = (item) => {
  currentCoupon.value = { ...item };
  delModal.value.openModal();
};

const getAllCoupon = (page = 1) => {
  currentPage.value = page;
  axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/coupons?page=${page}`).then((res) => {
    const { coupons, pagination } = res.data;
    allCoupon.value = coupons;
    currentPagination.value = pagination;
  }).catch((err) => {
    store.setSweetMessageError(err.response.data.message);
    Swal.fire(store.sweetMessage);
  });
};

const updateCoupon = (coupon) => {
  let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
  let httpMethos = 'post';
  let data = coupon;

  if (!isNew.value) {
    url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${currentCoupon.value.id}`;
    httpMethos = 'put';
    data = currentCoupon.value;
  }

  axios[httpMethos](url, { data }).then((res) => {
    store.toastMessage.fire({
      icon: 'success',
      title: res.data.message,
    });
    getAllCoupon(currentPage.value);
    couponModal.value.hideModal();
  }).catch((err) => {
    store.setSweetMessageError(err.response.data.message);
    Swal.fire(store.sweetMessage);
  });
};

const delCoupon = () => {
  axios.delete(
    `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${currentCoupon.value.id}`,
  ).then((res) => {
    store.toastMessage.fire({
      icon: 'success',
      title: res.data.message,
    });
    delModal.value.hideModal();
    getAllCoupon(currentPage.value);
  }).catch((err) => {
    store.setSweetMessageError(err.response.data.message);
    Swal.fire(store.sweetMessage);
  });
};

onMounted(() => {
  getAllCoupon();
});
</script>

<template>
  <h3 class="mt-4">優惠券管理</h3>
  <div>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
        type="button"
        @click="openCouponModal(true)"
      >
        建立新的優惠券
      </button>
    </div>
    <div class="bg-white mt-4 p-3">
      <table class="table table-striped mb-0">
        <thead>
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, key) in allCoupon"
            :key="key"
          >
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ $filters.date(item.due_date) }}</td>
            <td>
              <span
                v-if="item.is_enabled === 1"
                class="text-success"
              >啟用</span>
              <span
                v-else
                class="text-muted"
              >未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="openCouponModal(false, item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openDelCouponModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CouponModal
      :coupon="currentCoupon"
      :is-new="isNew"
      ref="couponModal"
      @update-coupon="updateCoupon"
    />
    <DelModal
      :item="currentCoupon"
      ref="delModal"
      @del-item="delCoupon"
    />
    <Pagination
      :pages="currentPagination"
      @change-page="getAllCoupon"
    />
  </div>
</template>
