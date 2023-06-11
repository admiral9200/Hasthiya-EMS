<template>
    <!-- user list -->
    <div class=" bg-slate-300 rounded-lg mx-4 my-10 overflow-x-auto shadow-2xl">
        <table class=" w-full">
            <thead>
                <th>Leave ID</th>
                <th>LEAVE TYPE</th>
                <th>REQUESTED ON</th>
                <th>LEAVE FROM</th>
                <th>LEAVE TO</th>
                <th>DURATION</th>
                <th>STATUS</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="leave in leaves" v-bind:key="leave._id">
                    <td>{{ leave._id }}</td>
                    <td v-if="leave.isMedical">Medical</td>
                    <td v-else>Casual</td>
                    <td>{{ formatDate(leave.createdAt) }}</td>
                    <td>{{ formatDate(leave.leaveFrom) }}</td>
                    <td v-if="leave.isOneday">{{ formatDate(leave.leaveFrom) }}</td>
                    <td v-else>{{ formatDate(leave.leaveTo) }}</td>
                    <td v-if="leave.isOneday && leave.isFullday">1 day</td>
                    <td v-else-if="leave.isOneday && !leave.isFullday">Half day</td>
                    <td v-else>{{ daysDiff(leave.leaveFrom, leave.leaveTo) }} days</td>
                    <td>{{ leave.status }}</td>
                    <td @click="openPopup(leave)"><i class=" fa fa-eye"></i></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- popup -->
    <div id="popup-modal" v-if="popup"
        class="flex fixed top-0 left-0 right-0 bottom-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center "
        style="background-color:rgba(0, 0, 0, 0.400)">
        <div class="relative bg-white rounded-lg shadow self-center px-20  m-auto w-full md:w-1/2">
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

            <!-- body -->
            <div class=" p-10">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">

                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Employee Name</h1>
                        <h1 class="text-base font-medium text-gray-700">{{ leave.employee.name }} </h1>
                    </div>
                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Report Person Name</h1>
                        <h1 class="text-base font-medium text-gray-700">{{ leave.reportPerson.name }} </h1>
                    </div>
                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Leave type</h1>
                        <h1 class="text-base font-medium text-gray-700" v-if="leave.isMedical">Medical </h1>
                        <h1 class="text-base font-medium text-gray-700" v-else>Casual </h1>
                    </div>
                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Requested On</h1>
                        <h1 class="text-base font-medium text-gray-700">{{ formatDate(leave.createdAt) }} </h1>
                    </div>
                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Leave From</h1>
                        <h1 class="text-base font-medium text-gray-700">{{ formatDate(leave.leaveFrom) }} </h1>
                    </div>
                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Leave To</h1>
                        <h1 class="text-base font-medium text-gray-700">{{ formatDate(leave.leaveTo) }} </h1>
                    </div>
                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Duration</h1>
                        <h1 class="text-base font-medium text-gray-700" v-if="leave.isOneday && leave.isFullday">Full day
                        </h1>
                        <h1 class="text-base font-medium text-gray-700" v-else-if="leave.isOneday && !leave.isFullday">Half
                            day </h1>
                        <h1 class="text-base font-medium text-gray-700" v-else>{{ daysDiff(leave.leaveFrom, leave.leaveTo)
                        }} days </h1>
                    </div>
                    <div class=" text-left">
                        <h1 class=" text-xs font-medium text-gray-400">Leave Status</h1>
                        <h1 class="text-base font-medium text-green-700" v-if="leave.status == 'Accepted'">{{ leave.status }}
                        </h1>
                        <h1 class="text-base font-medium text-yellow-700" v-else-if="leave.status == 'Pending'">{{
                            leave.status }} </h1>
                        <h1 class="text-base font-medium text-red-700" v-else>{{ leave.status }} </h1>

                    </div>
                </div>
                <div class=" text-left py-6">
                    <h1 class=" text-xs font-medium text-gray-400">Reason</h1>
                    <p class="text-base font-medium text-gray-700 break-all break-words">{{ leave.reason }} </p>
                </div>
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2"
                    v-if="leave.status == 'Pending' && leave.reportPerson._id == userState.user._id">
                    <button
                        class="justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white  hover:bg-green-700"
                        @click="updateLeaveStatus({ _id: leave._id, status: 'Accepted' })">Accept</button>
                    <button
                        class="justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white  hover:bg-red-700"
                        @click="updateLeaveStatus({ _id: leave._id, status: 'Rejected' })">Reject</button>
                </div>
                <div class="grid grid-cols-1 gap-6"
                    v-if="leave.status == 'Pending' && leave.employee._id == userState.user._id">
                    <button
                        class="justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white  hover:bg-red-700"
                        @click="updateLeaveStatus({ _id: leave._id, status: 'Canceled' })">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
    props: ['leaves'],
    data() {
        return {
            popup: false,
            leave: null,
        }
    },
    computed: mapGetters({
        userState: "getUserState",
    }),
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY')
            }
        },
        daysDiff(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = Math.abs(end - start);
            const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
            return Math.round(diff / oneDay);
        },
        closePopup() {
            this.popup = false;
            this.leave = null;
        },
        openPopup(leave) {
            this.popup = true;
            this.leave = leave
        },
        updateLeaveStatus(data) {
            this.$store.dispatch("updateLeave", { _id: data._id, status: data.status });
            this.closePopup();
            if (data.status == "Canceled") {
                this.$store.dispatch("getAllLeavesByEmployee", { page: this.$route.query.page, id: localStorage.getItem('userID') });
            } else {
                this.$store.dispatch("getAllLeavesByReportPerson", { page: this.$route.query.page, id: localStorage.getItem('userID') });
            }
        }
    }
}
</script>
