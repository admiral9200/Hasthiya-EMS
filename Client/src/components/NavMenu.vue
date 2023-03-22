<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between">
        <div class="flex space-x-7">

          <!-- Website Logo -->
          <div>
            <a href="#" class="flex items-center py-4 px-2">
              <img src="../assets/hasthiya-flt-img.png" alt="Logo" class="h-7 w-36 mr-2">
            </a>
          </div>

          <!-- Primary Navbar items -->
          <div class="hidden md:flex items-center space-x-1" v-if="userState.user && userState.user.role === 'admin'">
            <router-link v-for="item in adminNavigation" :key="item.name" :to="item.href" :class="[
              item.isactive
                ? 'bg-gray-900 text-white'
                : 'text-black font-bold hover:bg-gray-700 hover:text-white',
              'px-3 py-2 rounded-md text-sm font-medium',
            ]">{{ item.name }}</router-link>
          </div>
          <div class="hidden md:flex items-center space-x-1" v-else>
            <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[
              item.isactive
                ? 'bg-gray-900 text-white'
                : 'text-black font-bold hover:bg-gray-700 hover:text-white',
              'px-3 py-2 rounded-md text-sm font-medium',
            ]">{{ item.name }}</router-link>
          </div>
        </div>

        <div class=" flex items-center">
          <!-- notifiaction -->
          <Popper>
            <MenuButton class="flex mr-3 ">
              <span class="sr-only">Open user menu</span>
              <button class="inline-block relative">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span
                  class="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-red-400 bg-red-600"></span>
              </button>
            </MenuButton>
            <template #content>
              <div class=" bg-white shadow-lg rounded-md mt-3 flex-col py-3 px-7">

              </div>
            </template>
          </Popper>


          <!-- user menu -->
          <Popper>
            <MenuButton
              class="flex mr-3 rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <span class="sr-only">Open user menu</span>
              <img v-if="userState.user" class="h-8 w-8 rounded-full" :src="userState.user.imageurl" alt="" />
            </MenuButton>
            <template #content>
              <div class=" bg-white shadow-lg rounded-md mt-3 flex-col py-3 px-7">
                <div> <router-link class=" py-4 w-full text-left text-sm text-gray-700" to="/profile">Your
                    Profile</router-link></div>
                <div> <router-link class="py-4 w-full text-left text-sm text-gray-700"
                    to="/profile">Settings</router-link></div>
                <div> <router-link class=" py-4 w-full text-left text-sm text-gray-700" to="/profile">Help</router-link>
                </div>
                <div> <router-link @click="logout()" class=" py-4 w-full text-left text-sm text-gray-700"
                    to="/signin">Sign out</router-link></div>
              </div>
            </template>
          </Popper>


          <!-- Mobile menu button -->
          <button class="outline-none mobile-menu-button md:hidden" @click="menuTrigger">
            <i class="fa fa-bars text-xl text-black hover:text-green-600" v-if="!menu"></i>
            <i class="fa fa-times text-xl text-black hover:text-red-600" v-else></i>
          </button>
        </div>
      </div>
    </div>

    <!-- mobile menu -->
    <div v-if="menu" class="mobile-menu md:hidden">
      <router-link v-for="item in navigation" :key="item.name" :to="item.href" :class="[
        item.isactive
          ? 'bg-gray-900 text-white'
          : 'block text-sm font-bold px-2 py-4 hover:bg-green-500 transition duration-300',
        'px-3 py-2 rounded-md text-sm font-medium',
      ]">{{ item.name }}</router-link>
    </div>

  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
import { defineComponent } from "vue";
import Popper from "vue3-popper";

export default defineComponent({
  data() {
    return {
      navigation: [
        { name: "Home", href: "/" },
        { name: "Assets", href: "/userAssets" },
        { name: "Leaves", href: "/leaves" },
        { name: "Salary", href: "/usersalary" },
      ],
      adminNavigation: [
        { name: "Home", href: "/" },
        { name: "Assets", href: "/userAssets" },
        { name: "Leaves", href: "/leaves" },
        { name: "Salary", href: "/usersalary" },
        { name: "Admin panel", href: "/designation" },
      ],
      menu: false,
    }
  },
  methods: {
    logout: async function () {
      this.$store.dispatch("logout");
      return this.$router.push("/signin");
    },
    menuTrigger() {
      this.menu = !this.menu
    },
  },
  computed: mapGetters({
    userState: "getUserState",
  }),
  components: {
    Popper,
  },
});

</script>

