<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import cartStore from '../stores/cartStore';
import sweetMessageStore from '../stores/sweetMessageStore';

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
            this.setSweetMessageSuccess(res.data.message);
            this.$refs.form.resetForm();
            this.form.message = '';
            this.getCart();
            Swal.fire(this.sweetMessage);
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
};
</script>

<template>
  <div class="container">
    <div class="text-end">
      <button
        class="btn btn-outline-danger"
        type="button"
        :disabled="cartCount === 0"
        @click="removeCartAllItem()"
      >
        清空購物車
      </button>
    </div>
    <h2
      class="text-center"
      v-if="cartCount === 0"
    >目前購物車是空的</h2>
    <table
      v-else
      class="table align-middle"
    >
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="carts.carts">
          <tr
            v-for="(product, index) in carts.carts"
            :key="index"
          >
            <td>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(product.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                x
              </button>
            </td>
            <td>
              {{ product.product.title }}
              <!-- <div class="text-success">
                            已套用優惠券
                        </div> -->
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <!-- <input
                                    min="1"
                                    type="number"
                                    class="form-control"
                                    :value="product.qty"
                                > -->
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
                    >{{ i }}</option>
                  </select>
                  <span
                    class="input-group-text"
                    id="basic-addon2"
                  >{{
                    product.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <!-- <small class="text-success">折扣價：</small> -->
              {{ product.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td
            colspan="3"
            class="text-end"
          >總計</td>
          <td class="text-end">{{ carts.final_total }}</td>
        </tr>
        <!-- <tr>
                <td
                    colspan="3"
                    class="text-end text-success"
                >折扣價</td>
                <td class="text-end text-success">{{ }}</td>
            </tr> -->
      </tfoot>
    </table>
    <div class="my-5 row justify-content-center">
      <v-form
        ref="form"
        class="col-md-6"
        @submit="createOrder"
        v-slot="{ errors }"
      >
        <div class="mb-3">
          <label
            for="email"
            class="form-label"
          >Email</label>
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

        <div class="mb-3">
          <label
            for="name"
            class="form-label"
          >收件人姓名</label>
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

        <div class="mb-3">
          <label
            for="tel"
            class="form-label"
          >收件人電話</label>
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

        <div class="mb-3">
          <label
            for="address"
            class="form-label"
          >收件人地址</label>
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

        <div class="mb-3">
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
            class="btn btn-danger"
            :disabled="cartCount === 0"
          >送出訂單</button>
        </div>
      </v-form>
    </div>
  </div>
</template>
