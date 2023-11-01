<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h4>
          Students
          <router-link to="/student/create" class="btn btn-primary float-end">
            Add Student
          </router-link>
        </h4>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(student, index) in Students" :key="index">
              <td>{{ student.studentId }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.email }}</td>
              <td>{{ student.course }}</td>
              <td>{{ student.phone }}</td>
              <td>
                <router-link
                  :to="{ path: '/students/' + student.studentId + '/edit' }"
                  class="btn btn-success"
                >
                  Edit
                </router-link>
                <button
                  type="button"
                  @click="deleteStudent(student.studentId)"
                  class="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const endpoint_URL = "https://localhost:7284/Student";

export default {
  name: "students",
  data() {
    return {
      Students: [],
    };
  },
  mounted() {
    this.getStudent();
  },
  methods: {
    async getStudent() {
      try {
        const token = this.$cookies.get("token");
        const response = await axios.get(`${endpoint_URL}/GetAllStudent`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          this.Students = response.data;
        } else {
          console.log("Unexpected response status: ", response.status);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
        } else {
          console.error("An error occurred:", error);
        }
      }
    },
    // deleteStudent(studentId) {
    //   if (confirm("Are you sure you want to delete this student?")) {
    //     axios
    //       .delete(`${endpoint_URL}/DeleteStudent/${studentId}`)
    //       .then((response) => {
    //         this.Students = this.Students.filter(
    //           (student) => student.studentId !== studentId
    //         );
    //         console.log("Student deleted successfully.");
    //       })
    //       .catch((error) => {
    //         console.error("Error deleting student:", error);
    //       });
    //   } else {
    //     console.log("Mission aborted");
    //   }
    // },

    async deleteStudent(studentId) {
      try {
        if (confirm("Are are sure want to delete this student?")) {
          const token = this.$cookies.get("token");
          const response = await axios.delete(
            `${endpoint_URL}/DeleteStudent/${studentId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status == 200) {
            this.Students = this.Students.filter(
              (student) => student.studentId !== studentId
            );
            console.log("Student deleted successfully.");
          } else {
            console.log("Unexpected response status: ", response.status);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
        } else {
          console.error("An error occurred:", error);
        }
      }
    },
  },
};
</script>
