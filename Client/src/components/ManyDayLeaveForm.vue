<template>
  <div class="flex flex-col p-10 w-96">
      <form class="mt-8 space-y-6" @submit.prevent="submit" method="POST">
          <div>
              <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900 ">
                  One day Leave
              </h2>
          </div>
          <div class="-space-y-px rounded-md shadow-sm">
              <div>
                  <label for="leaveFrom" class="block text-sm font-medium text-gray-500 text-left">Leave From</label>
                  <input id="leaveFrom" name="leaveFrom" type="date" v-model="leave.leaveFrom"  required
                      class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
              </div>
              <div>
                  <label for="leaveTo" class="block text-sm font-medium text-gray-500 text-left">Leave To</label>
                  <input id="leaveTo" name="leaveTo" type="date" v-model="leave.leaveTo"  required :min="leave.leaveFrom" :disabled="!leave.leaveFrom"
                      class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
              </div>
              <div>
                  <label for="reason" class="block text-sm font-medium text-gray-500 text-left">Reason</label>
                  <textarea id="reason" name="reason" v-model="leave.reason" required
                      class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                      placeholder="Reason..." />
              </div>
              <div>
                  <label for="isMedical" class="block text-sm font-medium text-gray-500 text-left">Leave Type</label>
                  <select name="isMedical" id="isMedical" v-model="leave.isMedical" required
                      class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                      <option value=null>Leave Type*</option>
                      <option value=true>Medical</option>
                      <option value=false>Casual</option>
                  </select>
              </div>
              <div>
                  <label for="reportPerson" class="block text-sm font-medium text-gray-500 text-left">Report Person</label>
                  <input id="reportPerson" name="reportPerson" type="text" v-model="userState.user.reportPerson.name"
                      disabled readonly
                      class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                      placeholder="Report Person" />
              </div>
          </div>
          <div>
              <button type="submit"
                  class=" relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                  Request Leave
              </button>
          </div>
      </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
      return {
          leave: {
              leaveFrom: '',
              leaveTo:'',
              reason: '',
              isMedical: null,
          }
      }
  },
  computed: mapGetters({
      userState: "getUserState",
  }),
  methods: {
      submit: async function () {
              this.$store.dispatch("createLeave", { leaveTo:this.leave.leaveTo,leaveFrom:this.leave.leaveFrom, reason:this.leave.reason, isMedical:this.leave.isMedical, isFullday:true,isOneday:false, reportPerson:this.userState.user.reportPerson._id,employee:this.userState.user._id });
              this.closePopup()
      },
  },
  props:{
      closePopup:Function,
  }
}
</script>
