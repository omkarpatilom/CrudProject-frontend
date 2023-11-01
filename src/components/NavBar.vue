<template>
  <div class="nav-container">
    <header>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <RouterLink class="nav-link active" aria-current="page" to="/"
                  >Home</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" aria-current="page" to="/about"
                  >About</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" aria-current="page" to="/student"
                  >Students</RouterLink
                >
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" aria-current="page" to="Register"
                  >Register</RouterLink
                >
              </li>
            </ul>
            <form class="d-flex" role="search">
              <button class="btn btn-primary" @click="handleLogin">
                {{ loginbutton }}
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import { Cookies } from "vue-cookies"; // Import the vue-cookies library

export default {
  name: "navBar",
  data() {
    return {
      loginbutton: $cookies.get("token") ? "Logout" : "login",
    };
  },
  watch: {
    // Watch for changes to the token
    "$cookies.get('token')": function (newToken) {
      if (newToken) {
        console.log("");
        // If a new token is set (user logs in), call handleLogin
        // loginbutton: "logout";
      }
    },
  },

  methods: {
    handleLogin() {
      if ($cookies.get("token") != null) {
        // User is logged in, perform logout actions
        // Example: Clear the token and any other logout logic
        $cookies.remove("token");
        console.log("User logout succesfully");
        alert("User logout succesfully");

        // Redirect to the login page
        this.$router.push("/login");

        // Update the button text
        this.loginbutton = "Login"; // Change to "Login" after logout
      } else {
        // User is not logged in, perform login actions
        // Example: Set the user token and any other login logic

        // Redirect to the login page (you can modify this part based on your use case)
        this.$router.push("/login");

        // Update the button text
        this.loginbutton = "logout"; // Change to "Logout" after login
      }
    },
  },
};
</script>
