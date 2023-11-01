<template>
  <div class="homepage">
    <div class="welcome">
      <h1>Welcome, {{ name }}!</h1>
    </div>
    <div class="user-info">
      <h2>Your Account Information:</h2>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Token:</strong> {{ $cookies.get("token") }}</p>
    </div>
  </div>
</template>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f2f2f2;
}

.welcome {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}

.user-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}
</style>

<script lang="js">
import axios from 'axios'



export default {
  name: "Homepage",
  data() {
    return {
      name: "",
      email: "",

    };
  },

  mounted() {
    this.getUserByToken();


  },
  methods: {
    async getUserByToken() {
      this.$router.push("/Home");
      try {
        const token = this.$cookies.get("token"); // Retrieve the token
        if (!token) {
          console.log("token not found" + token);


          return;
        }
        console.log("Get Token: " + token);

        const response = await axios.get("https://localhost:7284/User/GetUserByToken", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          console.log(response.data);
          this.email = response.data.email,
            this.name = response.data.name
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
        } else {
          console.error("An error occurred:", error);
        }
      }
    }

  },

};
</script>

<!-- write logout fuction -->
