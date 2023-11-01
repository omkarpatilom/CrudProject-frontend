<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1>Login</h1>
      </div>
      <div class="card-body">
        <div>
          <ul
            class="alert alert-warning"
            v-if="Object.keys(this.errorList).length > 0"
          >
            <li
              class="mb-0 ms-3"
              v-for="(error, index) in this.errorList"
              :key="index"
            >
              {{ error[0] }}
            </li>
          </ul>
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input type="text" v-model="model.User.email" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Password</label>
          <input
            type="text"
            v-model="model.User.password"
            class="form-control"
          />
        </div>

        <div class="mb-3">
          <button type="submit" @click="GetUser" class="btn btn-primary">
            submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { VueCookies } from "vue-cookies";

export default {
  name: "LoginUser",

  data() {
    return {
      errorList: "",
      model: {
        User: {
          email: "",
          password: "",
        },
      },
    };
  },

  methods: {
    async GetUser() {
      try {
        const response = await axios.post(
          "https://localhost:7284/User/Authorize",

          this.model.User
        );
        if (response.status === 200) {
          alert("User Login successfully");

          // Handle the response with the "token" property
          const token = response.data.token;
          this.$cookies.set("token", token);
          console.log("Token: " + token);

          this.$router.push("/Home");
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorList = error.response.data.errors;
          alert("User Not Found");
        } else {
          console.error("An error occurred:", error);
        }
      }
    },
  },
};
</script>
