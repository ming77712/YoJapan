<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import sweetMessageStore from '../../stores/sweetMessageStore';

import OrderModal from '../../components/admin/OrderModal.vue';
import DelModal from '../../components/admin/DelModal.vue';
import Pagination from '../../components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      currentOrder: {},
      orders: {},
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(sweetMessageStore, ['setSweetMessageSuccess', 'setSweetMessageError']),
    getAllOrder(page = 1) {
      this.currentPage = page;
      axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${this.currentPage}`).then((res) => {
        const { orders, pagination } = res.data;
        this.orders = orders;
        this.pagination = pagination;
      }).catch((err) => {
        this.setSweetMessageError(err.response.data.message);
        Swal.fire(this.sweetMessage);
      });
    },
    updatePaid(item) {
      const paid = {
        is_paid: item.is_paid,
      };
      axios.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${item.id}`, { data: paid }).then((res) => {
        this.getAllOrder(this.currentPage);
        this.$refs.orderModal.hideModal();
        this.toastMessage.fire({
          icon: 'success',
          title: res.data.message,
        });
      }).catch((err) => {
        this.setSweetMessageError(err.response.data.message);
        Swal.fire(this.sweetMessage);
      });
    },
    delOrder() {
      axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${this.currentOrder.id}`).then((res) => {
        this.getAllOrder(this.currentPage);
        this.$refs.orderDelModal.hideModal();
        this.toastMessage.fire({
          icon: 'success',
          title: res.data.message,
        });
      }).catch((err) => {
        this.setSweetMessageError(err.response.data.message);
        Swal.fire(this.sweetMessage);
      });
    },
    openModal(item) {
      this.currentOrder = { ...item };
      this.$refs.orderModal.openModal();
    },
    openDelModal(item) {
      this.currentOrder = { ...item };
      this.$refs.orderDelModal.openModal();
    },
  },
  mounted() {
    this.getAllOrder();
  },
  computed: {
    ...mapState(sweetMessageStore, ['sweetMessage', 'toastMessage']),
  },
  components: {
    OrderModal,
    DelModal,
    Pagination,
  },
};
</script>

<template>
  <h3 class="mt-4">訂單列表</h3>
  <div class="bg-white mt-16 p-3">
    <table class="table table-striped mb-0">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="item in orders"
          :key="item.id"
        >
          <tr
            v-if="orders.length"
            :class="{ 'text-secondary': !item.is_paid }"
          >
            <td>{{ $filters.date(item.create_at) }}</td>
            <td><span
                v-text="item.user.email"
                v-if="item.user"
              ></span></td>
            <td>
              <ul class="list-unstyled">
                <li
                  v-for="product in item.products"
                  :key="product.id"
                >
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
                <label
                  class="form-check-label"
                  :for="`paidSwitch${item.id}`"
                >
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(item)"
                >
                  檢視
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <OrderModal
    :order="currentOrder"
    ref="orderModal"
    @update-paid="updatePaid"
  />
  <DelModal
    :item="currentOrder"
    ref="orderDelModal"
    @del-item="delOrder"
  />
  <Pagination
    :pages="pagination"
    @change-page="getAllOrder"
  />
</template>
