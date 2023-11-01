<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1>Edit student</h1>
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
            v-model="model.student.name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input
            type="text"
            v-model="model.student.email"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">Course</label>
          <input
            type="text"
            v-model="model.student.course"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="">phone</label>
          <input
            type="number"
            v-model="model.student.phone"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <button type="submit" @click="UpdateStudent" class="btn btn-primary">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const endpoint_URL = "https://localhost:7284/Student";
export default {
  name: "StudentEdit",
  data() {
    return {
      studentId: "",
      errorList: "",
      model: {
        student: {
          name: "",
          email: "",
          course: "",
          phone: "",
        },
      },
    };
  },
  created() {
    this.getStudentData(this.$route.params.id);
    this.studentId = this.$route.params.id;
  },
  methods: {
    async getStudentData(studentId) {
      // axios
      //   .get(`https://localhost:7284/Student/GetStudent/${studentId}`)
      //   .then((res) => {
      //     console.log(res.data);
      //     this.model.student = res.data;
      //   });

      try {
        const token = this.$cookies.get("token");
        const response = await axios.get(
          `${endpoint_URL}/GetStudent/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          this.model.student = response.data;
        } else {
          console.log("unexpected response occured :" + response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async UpdateStudent() {
      // axios
      //   .put(
      //     `https://localhost:7284/Student/UpdateStudent/${this.studentId}`,
      //     this.model.student
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     alert("student Updated successfully");
      //   })
      //   .catch(function (error) {
      //     if (error.response) {
      //       if (error.response.status == 422) {
      //         // mythis.errorList = error.response.data.errors;
      //         alert("Student not found");
      //       }
      //     } else if (error.request) {
      //       console.log(error.request);
      //     } else {
      //       console.log("Error", error.message);
      //     }
      //     console.log(error.config);
      //   });

      try {
        const token = this.$cookies.get("token");
        const response = await axios.put(
          `${endpoint_URL}/UpdateStudent/${this.studentId}`,
          this.model.student,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          alert("student Updated successfully");
          this.$router.push("/student");
        } else {
          alert("student not found");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
  },
};
</script>
