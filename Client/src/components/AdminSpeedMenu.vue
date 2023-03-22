<template>
    <div data-dial-init class="fixed right-6 bottom-6 group">
        <!-- menu -->
        <div id="speed-dial-menu-text-inside-button-square" class="flex flex-col items-center mb-4 space-y-2"
            v-if="open">
            <router-link to="/dashboard">
                <button type="button"
                    class="w-16 h-16 text-gray-500 bg-white rounded-lg border border-gray-200 hover:text-gray-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <i class="fa fa-solid fa-money-check-dollar"></i>
                    <span class="block mb-px text-xs font-medium">salaries</span>
                </button>
            </router-link>

            <router-link to="/technology">
                <button type="button"
                    class="w-16 h-16 text-gray-500 bg-white rounded-lg border border-gray-200 hover:text-gray-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <i class="fa fa-th-large"></i>
                    <span class="block mb-px text-xs font-medium">techs</span>
                </button>
            </router-link>

            <router-link to="/designation">
                <button type="button"
                    class="w-16 h-16 text-gray-500 bg-white rounded-lg border border-gray-200 hover:text-gray-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <i class="fa fa-th-large"></i>
                    <span class="block mb-px text-xs font-medium">job titles</span>
                </button>
            </router-link>

            <router-link to="/assetstype">
                <button type="button"
                    class="w-16 h-16 text-gray-500 bg-white rounded-lg border border-gray-200 hover:text-gray-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <i class="fa fa-th-large"></i>
                    <span class="block mb-px text-xs font-medium">Types</span>
                </button>
            </router-link>

            <router-link to="/assets">
                <button type="button"
                    class="w-16 h-16 text-gray-500 bg-white rounded-lg border border-gray-200 hover:text-gray-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <i class=" fa fa-th-large"></i>
                    <span class="block mb-px text-xs font-medium">assets</span>
                </button>
            </router-link>

            <router-link to="/user">
                <button type="button"
                    class="w-16 h-16 text-gray-500 bg-white rounded-lg border border-gray-200 hover:text-gray-900 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400">
                    <i class="fa fa-user"></i>
                    <span class="block mb-px text-xs font-medium">Users</span>
                </button>
            </router-link>
        </div>

        <!-- toggle btn -->
        <button @click="toggle" type="button" data-dial-toggle="speed-dial-menu-text-inside-button-square"
            aria-controls="speed-dial-menu-text-inside-button-square" aria-expanded="false"
            class="flex items-center justify-center text-white bg-blue-700 rounded-lg w-16 h-16">
            <i class=" fa fa-bars" v-if="!open"></i>
            <i class=" fa fa-times" v-if="open"></i>
            <span class="sr-only">Open actions menu</span>
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            open: false
        }
    },
    methods: {
        toggle() {
            this.open = !this.open
        }
    }
}
</script>

<style>

</style>