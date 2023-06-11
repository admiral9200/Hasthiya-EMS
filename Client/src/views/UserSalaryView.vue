<template>
  <h2 class="my-6 mx-7 text-left text-3xl font-bold tracking-tight text-gray-900">
    Salary History :
  </h2>

  <!-- salary list -->
  <salary-list-component />
  <!-- pagination -->
  <PaginationComponent :getPage="getPage" :totalPages="salaryState.totalPages" />
</template>

<script>
import { mapGetters } from 'vuex'
import PaginationComponent from '@/components/PaginationComponent.vue';
import SalaryListComponent from '@/components/SalaryListComponent.vue';

export default {
  computed: mapGetters({
    salaryState: "getSalaryState",
  }),
  components: {
    PaginationComponent,
    SalaryListComponent,
  },
  methods: {
    getPage(page) {
      this.page = page
      this.$router.push({ name: "userSalary", query: { page: page } })
    },
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.$store.dispatch("getAllSalaryByUser", { id: localStorage.getItem('userID'), page: this.$route.query.page });
        console.log("query", this.$route.query.page)
      },
    )
    this.$store.dispatch('getAllSalaryByUser', { id: localStorage.getItem('userID'), page: this.$route.query.page })
  },
};
</script>
