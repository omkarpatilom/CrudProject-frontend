<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1>Register</h1>
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
          <label for="">name</label>
          <input
            type="text"
            v-model="model.User.name"
            class="form-control"
            required
          />
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
          <button type="submit" @click="saveUser" class="btn btn-primary">
            submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const endpoint_URL = "https://localhost:7284/User";
export default {
  name: "RegisterUser",
  data() {
    return {
      errorList: "",
      model: {
        User: {
          name: "",
          email: "",
          password: "",
        },
      },
    };
  },
  methods: {
    async saveUser() {
      // var mythis = this;
      // axios
      //   .post("https://localhost:7284/User/CreateUser", this.model.User)
      //   .then((res) => {
      //     console.log(res);
      //     alert("User add sucessfully");
      //     this.$router.push("/login");
      //     this.model.User = {
      //       name: "",
      //       email: "",
      //       password: "",
      //     };
      //   })
      //   .catch(function (error) {
      //     if (error.response) {
      //       // The request was made and the server responded with a status code
      //       // that falls out of the range of 2xx
      //       if (error.response.status == 422) {
      //         mythis.errorList = error.response.data.errors;
      //       }
      //       // console.log(error.response.data);
      //       // console.log(error.response.status);
      //       // console.log(error.response.headers);
      //     } else if (error.request) {
      //       // The request was made but no response was received
      //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      //       // http.ClientRequest in node.js
      //       console.log(error.request);
      //     } else {
      //       // Something happened in setting up the request that triggered an Error
      //       console.log("Error", error.message);
      //     }
      //     console.log(error.config);
      //   });

      try {
        var token = this.$cookies.get("token");
        var response = await axios.post(
          `${endpoint_URL}/CreateUser`,
          this.model.User,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          alert("User add sucessfully");

          this.model.User = {
            name: "",
            email: "",
            password: "",
          };
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("error ocured :" + error);
      }
    },
  },
};
</script>
