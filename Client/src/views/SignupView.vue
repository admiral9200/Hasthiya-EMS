<template>
  <!-- error notification -->
  <div class="alert text-white bg-red-600 absolute top-1 right-1 rounded-lg z-50 px-4 py-2" x-transition.duration.300ms
    v-if="errors">
    <span class="text-3xl"><i class="fa fa-warning text-xl">{{ errors }}</i></span>
  </div>

  <!-- signin form -->
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 fixed inset-0 z-10 overflow-y-auto bg-blue-50">
    <div class="w-full max-w-md space-y-8 bg-white py-16 px-12 rounded-lg drop-shadow-2xl">
      <div>
        <h2 class="grid justify-items-center">
          <img src="../assets/hasthiya-logo.png" alt="Logo" class=" h-28 w-28  flex justify-center m-0">
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input id="name" v-model="user.name" name="name" type="name" autocomplete="name" required=""
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
              placeholder="name" />
          </div>
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
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </div>

        <div>
          <button type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            </span>
            Sign up
          </button>
        </div>
      </form>
      <div class="text-sm">
        <router-link to="/signin" class="font-medium text-indigo-600 hover:text-indigo-500">Sign in
          instead</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  data() {
    return {
      user: {
        name: "janith",
        email: "janithherath4@gmail.com",
        password: "1234",
      },
    };
  },
  methods: {
    login: async function () {
      console.log(this.$store)
      this.$store.dispatch("signup", this.user)
      return this.$router.push("/");
    },
  }
};
</script>
