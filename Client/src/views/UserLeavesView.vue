<template>
    <div class=" justify-between flex my-6 mx-7">
        <h2 class="text-left text-3xl font-bold tracking-tight text-gray-900">
            Leave History :
        </h2>
        <!-- Leave Request Button -->
        <button
            class="p-3 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
            @click="openPopup()">
            <i class="fa fa-add"></i> Request Leave
        </button>
    </div>

    <!-- Leave list -->
    <leave-list-component :leaves="leaveState.leaves" />

    <!-- pagination -->
    <PaginationComponent :getPage="getPage" :totalPages="leaveState.totalPages" />




    <!-- Request Leave-->
    <div id="popup-modal" v-if="popup"
        class="fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center"
        style="background-color:rgba(0, 0, 0, 0.400)">
        <div class="relative bg-white rounded-lg shadow self-center px-20  max-w-md m-auto">
            <button type="button" @click="closePopup()"
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
            <div class="flex flex-col p-7" v-if="!oneday & !manyday">
                <button
                    class="p-3 mb-5 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
                    @click="oneDay()">
                    One Day Leave
                </button>
                <button
                    class="p-3 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
                    @click="manyDay()">
                    Many Day Leave
                </button>
            </div>

            <div class="" v-if="oneday">
                oneday
            </div>
            <div class="" v-if="manyday">
                manyday
            </div>
        </div>
    </div>
</template>

<script>
import LeaveListComponent from '@/components/LeaveListComponent.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        LeaveListComponent,
        PaginationComponent
    },
    computed: mapGetters({
        leaveState: "getLeaveState",
        userState: "getUserState"
    }),
    created: function () {
        this.$watch(
            () => this.$route.query,
            () => {
                this.$store.dispatch("getAllLeavesByEmployee", { page: this.$route.query.page, id: this.userState._id });
                console.log("query", this.$route.query.page)
            },
        ),
            this.$store.dispatch("getAllLeavesByEmployee", { page: this.$route.query.page, id: this.userState.user._id });
    },
    data() {
        return {
            popup: false,
            oneday: false,
            manyday: false,
        }
    },
    methods: {
        closePopup() {
            this.popup = false;
            this.oneday = false;
            this.manyday = false;
        },
        openPopup() {
            this.popup = true;
            this.oneday = false;
            this.manyday = false;
        },
        oneDay() {
            this.oneday = true;
        },
        manyDay() {
            this.manyday = true;
        },
        getPage(page) {
            this.page = page
            this.$router.push({ name: "userLeaves", query: { page: page } })
        }
    },
}
</script>