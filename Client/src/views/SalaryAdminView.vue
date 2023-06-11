<template>
  <div class=" justify-between flex my-6 mx-7">
    <h2 class="text-left text-3xl font-bold tracking-tight text-gray-900">
      Salaries :
    </h2>
    <button @click="popup = true"
      class="p-3 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center">
      <i class="fa fa-add"></i> Add Salary
    </button>
  </div>
  <div class="flex mx-4">
    <input @change="salaryByDate()" id="month" name="month" type="month" v-model="month" required
      class="relative block w-full md:w-1/2 appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
  </div>

  <!-- Salary List -->
  <salary-list-component />

  <!-- pagination -->
  <PaginationComponent :getPage="getPage" :totalPages="salaryState.totalPages" />

  <!-- Add salary sec -->
  <div id="popup-modal" v-if="popup"
    class="flex fixed top-0 left-0 right-0 bottom-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center"
    style="background-color:rgba(0, 0, 0, 0.400)">
    <div class="relative bg-white rounded-lg shadow self-center px-20  max-w-md m-auto">
      <button type="button" @click="popup = false"
        class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
        data-modal-hide="popup-modal">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Close modal</span>
      </button>

      <!-- form -->
      <form class=" grid py-20" @submit.prevent="create" method="POST">
        <h1 class=" text-xl font-bold ">Add Salary</h1>
        <div class="">
          <input id="month" name="month" type="month" v-model="salary.month" required
            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
        </div>
        <div class="">
          <input id="salary" name="salary" type="number" v-model="salary.usDollerValue" min="0" required
            placeholder="Salary"
            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
        </div>

        <div>
          <button type="submit"
            class=" group relative flex w-fit justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-auto text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  <AdminSpeedMenu />
</template>

<script>
import AdminSpeedMenu from '@/components/AdminSpeedMenu.vue';
import { mapGetters } from 'vuex'
import PaginationComponent from '@/components/PaginationComponent.vue';
import SalaryListComponent from '@/components/SalaryListComponent.vue';

export default {
  computed: mapGetters({
    salaryState: "getSalaryState",
  }),
  components: {
    AdminSpeedMenu,
    PaginationComponent,
    SalaryListComponent,
  },
  methods: {
    getPage(page) {
      this.page = page
      if (this.$route.params.date) {
        this.$router.push({ name: "salaryByDate", query: { page: page }, params: { date: this.$route.params.date } })
      } else {
        this.$router.push({ name: "salary", query: { page: page } })
      }
    },
    create: async function () {
      let date = this.salary.month.concat("-26");
      this.$store.dispatch('createSalary', { usDollerValue: this.salary.usDollerValue, salaryDate: date });
      this.popup = false;
      this.$store.dispatch('getAllSalary', { page: this.$route.query.page });
    },
    salaryByDate() {
      let date = this.month.concat("-26");
      this.$router.push({ name: "salaryByDate", query: { page: 1 }, params: { date: date } })
    },
    getsalary() {
      if (this.$route.params.date) {
        this.$store.dispatch('getAllSalaryByDate', { page: this.$route.query.page, date: this.$route.params.date })
      } else {
        this.$store.dispatch('getAllSalary', { page: this.$route.query.page })
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.getsalary();
      },
      () => this.$route.params,
      () => {
        this.getsalary();
      },
    ),
      this.getsalary();
  },
  data() {
    return {
      popup: false,
      salary: {
        month: '',
        usDollerValue: '',
      },
      month: ''
    }
  }
};
</script>
