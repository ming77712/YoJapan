<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useSweetMessageStore from '@/stores/sweetMessageStore';

const { VITE_URL } = import.meta.env;

const store = useSweetMessageStore();
const router = useRouter();

const user = ref({ username: '', password: '' });

const login = () => {
  axios
    .post(`${VITE_URL}/admin/signin`, user.value)
    .then((res) => {
      const { token, expired } = res.data;
      document.cookie = `hexToken= ${token}; expires=${new Date(
        expired,
      )};`;
      store.setSweetMessageSuccess(res.data.message);
      Swal.fire(store.sweetMessage);
      setTimeout(() => {
        router.push('/admin/products');
      }, 1500);
    })
    .catch((err) => {
      store.setSweetMessageError(err.response.data.message);
      Swal.fire(store.sweetMessage);
    });
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
        class="btn btn-primary border-2 rounded-3 text-white fw-600 px-5 py-3 w-100 mt-4"
        type="submit"
      >登入</button>
    </form>
  </div>
</template>

<style scoped>
.background {
  width: 370px;
  height: 460px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;

  @media (min-width: 768px) {
    width: 430px;
    height: 520px;
  }
}

.background .shape {
  @media (min-width: 768px) {
    height: 200px;
    width: 200px;
    position: absolute;
    border-radius: 50%;
  }
}

.shape:first-child {
  @media (min-width: 768px) {
    background: linear-gradient(#1845ad,
        #23a2f6);
    left: -80px;
    top: -80px;
  }
}

.shape:last-child {
  @media (min-width: 768px) {
    background: linear-gradient(to right,
        #ff512f,
        #f09819);
    right: -80px;
    bottom: -80px;
  }
}

form {
  height: 460px;
  width: 340px;
  padding: 50px 35px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);

  @media (min-width: 768px) {
    height: 520px;
    width: 400px;
    padding: 50px 35px;

  }
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
