<template>
  <div class=" mx-4 mt-3">
    <search-bar-component/>
  </div>

  <div>
    <!-- content -->
    <div class=" px-5 py-4">
      <div class="grid grid-cols-4 gap-1 screen-md:block">
        <!-- user filters -->
        <div class=" bg-slate-50 rounded-lg  shadow-lg screen-md:mb-4">          
          <DesignationListComponent/>
          <TechnologyListComponent />
        </div>

        <!-- users -->
        <div class="col-span-3 bg-slate-50 rounded-lg pb-5 shadow-lg">
          <UserListComponent :users="userState.users" />

          <!-- pagination -->
          <PaginationComponent :getPage="getPage" :totalPages="userState.totalPages"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PaginationComponent from '@/components/PaginationComponent.vue';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import DesignationListComponent from '@/components/DesignationListComponent.vue';
import TechnologyListComponent from "@/components/TechnologyListComponent.vue";
import UserListComponent from "@/components/UserListComponent.vue";

export default {
  name: "HomeView",
  computed: mapGetters({
    userState: "getUserState",
  }),
  created: function () {
    this.reload()
    this.$watch(
      () => this.$route.query,
      () => {
        this.$store.dispatch("getAllUsers", this.$route.query.page);
        console.log("query", this.$route.query.page)
      },
    ),
      this.$store.dispatch("getAllUsers", this.$route.query.page);
  },
  methods: {
    getPage(page) {
      this.page = page
      this.$router.push({ name: "home", query: { page: page } })
    },
    reload () {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}
  },
  components: {
    PaginationComponent,
    SearchBarComponent,
    DesignationListComponent,
    TechnologyListComponent,
    UserListComponent
}
};
</script>
