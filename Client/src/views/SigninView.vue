<template>
  <!-- signin form -->
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 fixed inset-0 z-10 overflow-y-auto bg-blue-50">
    <div class="w-full max-w-md space-y-8 bg-white py-16 px-12 rounded-lg drop-shadow-2xl">
      <div>
        <h2 class="grid justify-items-center">
          <img src="../assets/hasthiya-logo.png" alt="Logo" class="h-28 w-28 flex justify-center m-0">
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="user.email" name="email" type="email" autocomplete="email" required=""
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
              placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" v-model="user.password" name="password" type="password" autocomplete="current-password"
              required=""
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
              placeholder="Password" />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500" @click="popup = true">Forgot your
              password?</a>
          </div>
        </div>

        <div>
          <button type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            </span>
            Sign in
          </button>
        </div>
      </form>
      <div class="text-sm">
        <router-link to="/signup" class="font-medium text-indigo-600 hover:text-indigo-500">Create account</router-link>
      </div>
    </div>
  </div>

  <!-- forget password form popup-->
  <div id="popup-modal" v-if="popup"
    class="flex fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center"
    style="background-color:rgba(0, 0, 0, 0.400)">
    <div class="relative bg-white rounded-lg shadow self-center px-20  m-auto">
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
      <!-- forget password form -->
      <form class="m-8 space-y-6" @submit.prevent="forgetPassword" method="POST">
        <h3 class=" text-left font-semibold">Forget Password</h3>
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required=""
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
              placeholder="Email address" />
          </div>
        </div>

        <div>
          <button type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            </span>
            Reset Password
          </button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex';
import { AuthService } from "@/services/AuthService";
import { NotificationHelper } from "@/helper/NotificationHelper";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      popup: false,
      email: "",
    };
  },
  methods: {
    login: async function () {
      this.$store.dispatch("login", this.user)
    },
    forgetPassword: async function () {
      try {
            const response = await AuthService.forgetPasswordEmail({email: this.email});
            console.log(response)
            if (response.data.status == 200) {
                NotificationHelper.notificationhandler("Check your email for reset password link!")
            } else {
                NotificationHelper.errorhandler(response.data.msg)
            }
            this.popup = false;
        } catch (error) {
            NotificationHelper.errorhandler(error)
        }
    },
  },
  computed: mapGetters({
    userState: "getUserState",
  }),
};
</script>
