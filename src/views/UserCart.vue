<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';
import sweetMessageStore from '@/stores/sweetMessageStore';
import ProgressBar from '@/components/ProgressBar.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    ...mapActions(cartStore, [
      'getCart',
      'changeQty',
      'removeCartAllItem',
      'removeCartItem',
    ]),
    ...mapActions(sweetMessageStore, ['setSweetMessageSuccess', 'setSweetMessageError']),
    createOrder() {
      if (this.carts.carts.length === 0) {
        this.setSweetMessageError('購物車是空的 無法送出訂單');
        Swal.fire(this.sweetMessage);
      } else {
        const data = this.form;
        axios
          .post(`${VITE_URL}/api/${VITE_PATH}/order`, { data })
          .then((res) => {
            this.$refs.form.resetForm();
            this.form.message = '';
            this.getCart();
            this.$router.push(`/order/${res.data.orderId}`);
          })
          .catch((err) => {
            this.setSweetMessageError(err.response.data.message);
            Swal.fire(this.sweetMessage);
          });
      }
    },
  },
  mounted() {
    this.getCart();
  },
  computed: {
    ...mapState(cartStore, ['carts', 'cartCount']),
    ...mapState(sweetMessageStore, ['sweetMessage']),
  },
  components: {
    ProgressBar,
  },
};
</script>

<template>
  <main>
    <div class="container mt-12">
      <ProgressBar :progress="0" />
      <div class="row justify-content-center">
        <div class="col-md-6 g-10 mb-8 mb-md-0">
          <h3 class="fs-4">購物車</h3>
          <hr>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
            v-if="cartCount === 0"
          >
            <h3 class="mb-8">購物車現在是空的~ 快去挑選喜愛的行程吧</h3>
            <RouterLink
              to="/products"
              type="button"
              class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
            >
              推薦行程
            </RouterLink>
          </div>
          <ul
            v-else
            v-for="(product, index) in carts.carts"
            :key="index"
          >
            <li class="row mb-4">
              <div class="col-lg-5">
                <img
                  :src="product.product.imageUrl"
                  class="w-100"
                  style="height: 150px;"
                  alt="product.product.title"
                >
              </div>
              <div class="col-lg-7">
                <div class="d-flex justify-content-between align-items-center">
                  <h2 class="fs-5 mt-5 mb-6">{{ product.product.title }}</h2>
                  <button
                    type="button"
                    class="btn btn-sm"
                    @click="removeCartItem(product.id)"
                  >
                    <i class="bi bi-x fs-5"></i>
                  </button>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="input-group input-group-sm w-40 mb-3">
                    <select
                      class="form-select"
                      name="qty"
                      id="qty"
                      :value="product.qty"
                      @change="(e) => changeQty(product.id, product.product_id, e)"
                    >
                      <option
                        :value="i"
                        v-for="i in 20"
                        :key="i"
                        class="form-control"
                      >{{ i }}</option>
                    </select>
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <span>價格：NT$ {{ parseInt(product.product.price).toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                    <span>小計：NT$ {{ parseInt(product.product.price * product.qty).toFixed(0)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <hr>
          <div class="d-flex justify-content-between">
            <button
              class="btn btn-outline-danger border-2 rounded-3 fw-600 px-5 py-3"
              type="button"
              :disabled="cartCount === 0"
              @click="removeCartAllItem()"
            >
              清空購物車
            </button>
            <span class="fs-4">總計：NT$ {{ parseInt(carts.final_total).toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
          </div>
          <!--
                <td
                    colspan="3"
                    class="text-end text-success"
                >折扣價</td>
                <td class="text-end text-success">{{ }}</td>
          -->
        </div>
        <div class="col-md-6 g-10">
          <h3 class="fs-4">訂購人資訊</h3>
          <hr>
          <div class="">
            <v-form
              ref="form"
              class=""
              @submit="createOrder"
              v-slot="{ errors }"
            >
              <div class="mb-2">
                <label
                  for="email"
                  class="form-label"
                ><span class="text-danger">*</span> Email</label>
                <v-field
                  id="email"
                  name="Email"
                  type="email"
                  class="form-control"
                  rules="email|required"
                  v-model="form.user.email"
                  :class="{ 'is-invalid': errors['Email'] }"
                  placeholder="請輸入 Email"
                ></v-field>
                <error-message
                  name="Email"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-2">
                <label
                  for="name"
                  class="form-label"
                ><span class="text-danger">*</span> 收件人姓名</label>
                <v-field
                  id="name"
                  name="姓名"
                  type="text"
                  class="form-control"
                  rules="required"
                  v-model="form.user.name"
                  :class="{ 'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名"
                ></v-field>
                <error-message
                  name="姓名"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-2">
                <label
                  for="tel"
                  class="form-label"
                ><span class="text-danger">*</span> 收件人電話</label>
                <v-field
                  id="tel"
                  name="電話"
                  type="tel"
                  class="form-control"
                  rules="required|min:8|max:10"
                  v-model="form.user.tel"
                  :class="{ 'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話"
                ></v-field>
                <error-message
                  name="電話"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-2">
                <label
                  for="address"
                  class="form-label"
                ><span class="text-danger">*</span> 收件人地址</label>
                <v-field
                  id="address"
                  name="地址"
                  type="text"
                  class="form-control"
                  rules="required"
                  v-model="form.user.address"
                  :class="{ 'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址"
                ></v-field>
                <error-message
                  name="地址"
                  class="invalid-feedback"
                ></error-message>
              </div>
              <div class="mb-2">
                <label
                  for="message"
                  class="form-label"
                >留言</label>
                <textarea
                  name=""
                  id="message"
                  class="form-control"
                  v-model="form.message"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div class="text-end">
                <button
                  type="submit"
                  class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3"
                  :disabled="cartCount === 0"
                >送出訂單</button>
              </div>
            </v-form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
