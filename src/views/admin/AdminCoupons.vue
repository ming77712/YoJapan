<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import sweetMessageStore from '../../stores/sweetMessageStore';

import CouponModal from '../../components/admin/CouponModal.vue';
import DelModal from '../../components/admin/DelModal.vue';
import Pagination from '../../components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      currentCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: '',
      },
      coupons: {},
      isNew: false,
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(sweetMessageStore, [
      'setSweetMessageSuccess',
      'setSweetMessageError',
    ]),
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.currentCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.currentCoupon = { ...item };
      }
      this.$refs.couponModal.openModal();
    },
    openDelCouponModal(item) {
      this.currentCoupon = { ...item };
      this.$refs.delModal.openModal();
    },
    getAllCoupon(currentPage = 1) {
      this.currentPage = currentPage;
      axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/coupons?page=${currentPage}`).then((res) => {
        const { coupons, pagination } = res.data;
        this.coupons = coupons;
        this.pagination = pagination;
      }).catch((err) => {
        this.setSweetMessageError(err.response.data.message);
        Swal.fire(this.sweetMessage);
      });
    },
    updateCoupon(currentCoupon) {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
      let httpMethos = 'post';
      let data = currentCoupon;

      if (!this.isNew) {
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.currentCoupon.id}`;
        httpMethos = 'put';
        data = this.currentCoupon;
      }

      axios[httpMethos](url, { data }).then((res) => {
        this.toastMessage.fire({
          icon: 'success',
          title: res.data.message,
        });
        this.getAllCoupon(this.currentPage);
        this.$refs.couponModal.hideModal();
      }).catch((err) => {
        this.setSweetMessageError(err.response.data.message);
        Swal.fire(this.sweetMessage);
      });
    },
    delCoupon() {
      axios.delete(
        `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.currentCoupon.id}`,
      ).then((res) => {
        this.toastMessage.fire({
          icon: 'success',
          title: res.data.message,
        });
        this.$refs.delModal.hideModal();
        this.getAllCoupon(this.currentPage);
      }).catch((err) => {
        this.setSweetMessageError(err.response.data.message);
        Swal.fire(this.sweetMessage);
      });
    },
  },
  mounted() {
    this.getAllCoupon();
  },
  computed: {
    ...mapState(sweetMessageStore, ['sweetMessage', 'toastMessage']),
  },
  components: {
    CouponModal,
    DelModal,
    Pagination,
  },
};
</script>

<template>
  <h3 class="mt-4">優惠券管理</h3>
  <div>
    <div class="text-end mt-4">
      <button
        class="btn btn-primary"
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
            v-for="(item, key) in coupons"
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
      :pages="pagination"
      @change-page="getAllCoupon"
    />
  </div>
</template>
