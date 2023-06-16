<template>
    <!-- forget Password form -->
    <div
        class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 fixed inset-0 z-10 overflow-y-auto bg-blue-50">
        <div class="w-full max-w-md space-y-8 bg-white py-16 px-12 rounded-lg drop-shadow-2xl">
            <div>
                <h2 class="grid justify-items-center">
                    <img src="../assets/hasthiya-logo.png" alt="Logo" class="h-28 w-28 flex justify-center m-0">
                </h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="forgetPassword" method="POST">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label for="password" class="sr-only">New Password</label>
                        <input id="password" v-model="user.password" name="password" type="password"
                            autocomplete="current-password" required
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="Password" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Confirm Password</label>
                        <input id="ConfirmPassword" v-model="user.confirmPassword" name="password" type="password"
                            autocomplete="current-password" required
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="Confirm Password" />
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
import { AuthService } from "@/services/AuthService";
import { NotificationHelper } from "@/helper/NotificationHelper";
import router from "@/router";

export default {
    data() {
        return {
            user: {
                confirmPassword: "",
                password: "",
            },
        };
    },
    methods: {
        forgetPassword: async function () {
            try {
                if (this.user.password != this.user.confirmPassword) {
                    NotificationHelper.errorhandler("Password and Confirm Password does not match!")
                    return;
                }
                const response = await AuthService.forgetPassword(this.$route.params.id, this.user);
                if (response.data.status == 200) {
                    NotificationHelper.notificationhandler("Password Reset Successfully!")
                    return router.push("/signin");
                } else {
                    NotificationHelper.errorhandler(response.data.msg)
                }
            } catch (error) {
                NotificationHelper.errorhandler(error)
            }
        },
    },
};
</script>
  