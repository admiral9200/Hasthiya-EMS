<template>
  <!-- profile -->
  <user-details-component :user="userState.user"/>

  <!-- Edit btn -->
  <button class=" bg-slate-600 rounded-full text-white fixed right-4 bottom-4 w-12 h-12" @click="openPopup()">
    <i class="fa fa-pen"></i>
  </button>

  <!-- Request Leave-->
  <div id="popup-modal" v-if="popup"
    class=" flex fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center"
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


      <div class="flex flex-col p-10" v-if="!changepass">
        <button
          class="p-3 mb-5 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
          @click="changepass = true">
          Change Password
        </button>

        <button
          class="p-3 mb-5 text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center"
          @click="editProfile()">
          Edit Profile
        </button>
      </div>

      <!-- Change Password Form -->
      <div class="flex flex-col p-10" v-if="changepass">
        <form class="mt-8 space-y-6" @submit.prevent="submit" method="POST">
          <div>
            <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900 ">
              Change Password
            </h2>
          </div>
          <div class="-space-y-px rounded-md shadow-sm">
            <div>
              <input id="password" name="password" type="password" v-model="changePassword.Password"
                autocomplete="password" required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                placeholder="Current Password" />
            </div>
            <div>
              <input id="newpassword" name="newpassword" type="password" v-model="changePassword.newpassword" required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                placeholder="New Password" />
            </div>
            <div>
              <input id="confirmpassword" name="confirmpassword" type="password" v-model="changePassword.confirmpassword"
                required
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Confirm New Password" />
            </div>
          </div>
          <div>
            <button type="submit"
              class=" group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
              Update Password
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</template>



<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { NotificationHelper } from "@/helper/NotificationHelper";
import UserDetailsComponent from '@/components/UserDetailsComponent.vue';
export default {
  components: { UserDetailsComponent },
  data() {
    return {
      page: 1,
      changepass: false,
      popup: false,
      changePassword: {
        Password: '',
        newpassword: '',
        confirmpassword: '',
      }
    }
  },
  computed: mapGetters({
    userState: "getUserState",
  }),
  methods: {
    submit: async function () {
      if (this.changePassword.newpassword != this.changePassword.confirmpassword) {
        NotificationHelper.errorhandler("New Password and Confirm Password does not match");
      } else {
        this.$store.dispatch("updateLoggedUserPassword", { password: this.changePassword.Password, newpassword: this.changePassword.newpassword,_id: this.userState.user._id });
        this.closePopup();
      }
    },
    formatDate(value) {
      if (value) {
        return moment(String(value)).format(' Do MMMM YYYY')
      }
    },
    closePopup() {
      this.popup = false;
      this.changepass = false;
    },
    openPopup() {
      this.popup = true;
    },
    editProfile() {
      this.$router.push({ name: 'editProfile' })
    },
  },
}
</script>

<style></style>