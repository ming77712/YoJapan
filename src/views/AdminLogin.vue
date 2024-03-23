<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import sweetMessageStore from '../stores/sweetMessageStore';

const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(sweetMessageStore, ['setSweetMessageSuccess', 'setSweetMessageError']),
    login() {
      axios
        .post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken= ${token}; expires=${new Date(
            expired,
          )};`;
          this.setSweetMessageSuccess(res.data.message);
          Swal.fire(this.sweetMessage);
          setTimeout(() => {
            this.$router.push('/admin/products');
          }, 1500);
        })
        .catch((err) => {
          this.setSweetMessageError(err.response.data.message);
          Swal.fire(this.sweetMessage);
        });
    },
  },
  computed: {
    ...mapState(sweetMessageStore, ['sweetMessage']),
  },
};
</script>

<template>
  <div class="container">
    <div class="background">
      <div class="shape"></div>
      <div class="shape"></div>
    </div>
    <form>
      <h3>後台登入</h3>

      <label for="username">Email address</label>
      <input
        v-model="user.username"
        type="email"
        class="form-control"
        id="username"
        placeholder="Email"
        required
        autofocus
      />

      <label for="password">Password</label>
      <input
        v-model="user.password"
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        required
      />
      <button
        @click.prevent="login"
        class="btn btn-lg btn-primary w-100 mt-3"
        type="submit"
      >登入</button>
    </form>
  </div>
</template>

<style scoped>
.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}

.shape:first-child {
  background: linear-gradient(#1845ad,
      #23a2f6);
  left: -80px;
  top: -80px;
}

.shape:last-child {
  background: linear-gradient(to right,
      #ff512f,
      #f09819);
  right: -30px;
  bottom: -80px;
}

form {
  height: 520px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
}

form * {
  letter-spacing: 0.5px;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
}

button {
  margin-top: 50px;
  width: 100%;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}
</style>
