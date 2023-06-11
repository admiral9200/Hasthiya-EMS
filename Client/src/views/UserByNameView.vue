<template>
    <div class=" mx-4 mt-3">
        <search-bar-component />
    </div>

    <div>
        <!-- content -->
        <div class=" px-5 py-4">
            <div class="grid grid-cols-4 gap-1 screen-md:block">
                <!-- user filters -->
                <div class=" bg-slate-50 rounded-lg  shadow-lg screen-md:mb-4">
                    <DesignationListComponent />
                    <TechnologyListComponent />
                </div>

                <!-- users -->
                <div class="col-span-3 bg-slate-50 rounded-lg pb-5 shadow-lg">
                    <UserListComponent :users="userState.users" />

                    <!-- pagination -->
                    <PaginationComponent :getPage="getPage" :totalPages="userState.totalPages" />
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
    computed: mapGetters({
        userState: "getUserState",
    }),
    created: function () {
        this.$watch(
            () => this.$route.params,
            () => {
                this.getAllUsersByName();
            },
        ),
            this.$watch(
                () => this.$route.query,
                () => {
                    this.getAllUsersByName();
                },
            ),
            this.getAllUsersByName();
    },
    methods: {
        getPage(page) {
            this.page = page
            this.$router.push({ name: "userByName",params: { searchTerm:this.$route.params.searchTerm }, query: { page: page } })
        },
        getAllUsersByName() {
            this.$store.dispatch("getAllUsersByName", { searchTerm: this.$route.params.searchTerm, page: this.$route.query.page });
        },
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
  