<template>
    <!-- salary list -->
    <div class=" bg-slate-200 mx-4 rounded-lg shadow-sm mb-10">
        <table class=" w-full overflow-scroll">
            <thead>
                <th>Date</th>
                <th class=" screen-md:hidden">Basic</th>
                <th class=" screen-md:hidden">Doller Rate</th>
                <th class=" screen-md:hidden">EPF</th>
                <th class=" screen-md:hidden">Total</th>
                <th>View</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="salary in salaryState.salaries" v-bind:key="salary._id">
                    <td>{{ formatDatev1(salary.salaryDate) }}</td>
                    <td class=" screen-md:hidden ">Rs.{{ salary.basic * salary.usDollerValue }}</td>
                    <td class=" screen-md:hidden">Rs.{{ salary.usDollerValue }}</td>
                    <td class=" screen-md:hidden">Rs.{{ salary.basic * salary.usDollerValue * 0.12 }}</td>
                    <td class=" screen-md:hidden">Rs.{{ salary.basic * salary.usDollerValue * 0.98 }}</td>
                    <td
                        @click="openPopup(salary.salaryDate, salary.basic * salary.usDollerValue, salary.usDollerValue, salary.basic * salary.usDollerValue * 0.12, salary.basic * salary.usDollerValue * 0.98, salary.designation.name, salary.employee.name)">
                        <i class="fa fa-eye hover:text-yellow-500"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>



    <!-- salary sheet -->
    <div id="popup-modal" v-if="popup"
        class="fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full justify-center"
        style="background-color:rgba(0, 0, 0, 0.400)">
        <div class="relative bg-white rounded-lg shadow self-center px-20  m-auto h-full">
            <button type="button" @click="closePopup()"
                class="no-print absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-red-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                data-modal-hide="popup-modal">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4">
                <div class="flex flex-col">
                    <!-- header -->
                    <div class=" flex-row justify-between pb-3">
                        <div class="flex flex-col">
                            <img src="../assets/hasthiya-logo.png" alt="Logo" class=" h-28 w-28 m-auto">
                            <h2 class="text-2xl font-semibold text-gray-900">Salary Slip</h2>
                            <p class="text-sm text-gray-500">Salary Details of {{ formatDate(salaryDate) }}</p>
                        </div>
                    </div>
                    <!-- user details -->
                    <div class=" flex-row justify-between pb-3">
                        <div class="flex flex-row">
                            <p class="text-xl font-semibold text-gray-900">Employee name:</p>
                            <h2 class="text-xl font-light text-gray-500">{{ employee }}</h2>
                        </div>
                        <div class="flex flex-row">
                            <p class="text-xl font-semibold text-gray-900">Employee Designtion:</p>
                            <h2 class="text-xl font-light text-gray-500">{{ designation }}</h2>
                        </div>
                    </div>
                    <hr class=" mb-6">
                    <!-- salary details -->
                    <div class="flex flex-row justify-between mb-3">
                        <p class="text-xl font-semibold text-gray-900">Basic Salary</p>
                        <h2 class="text-xl font-light text-gray-500">Rs.{{ basic }}</h2>
                    </div>
                    <div class="flex flex-row justify-between mb-3">
                        <p class="text-xl font-semibold text-gray-900">Dollar Rate</p>
                        <h2 class="text-xl font-light text-gray-500">Rs.{{ dollarRate }}</h2>
                    </div>
                    <div class="flex flex-row justify-between mb-3">
                        <p class="text-xl font-semibold text-gray-900">EPF(12%)</p>
                        <h2 class="text-xl font-light text-gray-500 ">Rs.{{ epf }}</h2>
                    </div>
                    <div class="flex flex-row justify-between mb-10">
                        <p class="text-xl font-semibold text-gray-900">Total Salary</p>
                        <h2 class="text-xl font-light text-gray-500 underline decoration-double underline-offset-8">Rs.{{
                            total }}
                        </h2>
                    </div>
                    <button @click="print" class=" no-print">Print</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
  
  
<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
    computed: mapGetters({
        salaryState: "getSalaryState",
    }),
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM YYYY')
            }
        },
        formatDatev1(value) {
            if (value) {
                return moment(String(value)).format('MM/YYYY')
            }
        },
        openPopup(salaryDate, basic, dollarRate, epf, total, designation, employee) {
            this.popup = true
            this.salaryDate = salaryDate
            this.basic = basic
            this.dollarRate = dollarRate
            this.epf = epf
            this.total = total
            this.designation = designation
            this.employee = employee
        },
        closePopup() {
            this.popup = false;
        },
        print() {
            window.print();
        }
    },
    data() {
        return {
            popup: false,
            salaryDate: '',
            basic: '',
            dollarRate: '',
            epf: '',
            total: '',
            designation: '',
            employee: '',
        }
    },
};
</script>
  
<style>
@page {
    size: auto;
    margin: 0mm;
}

@media print {

    .no-print,
    .no-print * {
        display: none !important;
    }
}</style>