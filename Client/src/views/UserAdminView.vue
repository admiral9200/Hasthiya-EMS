<template>
    <h2 class="my-6 mx-7 text-left text-3xl font-bold tracking-tight text-gray-900">
        Users :
    </h2>
    <div class=" bg-slate-200 mx-7 rounded-lg shadow-sm mb-10">
        <table class=" w-full overflow-scroll">
            <thead>
                <th>Name</th>
                <th class=" screen-md:hidden">Email</th>
                <th class=" screen-md:hidden">Created At</th>
                <th class=" screen-md:hidden">Updated At</th>
                <th>Role</th>
                <th>Edit</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="user in userState.users" v-bind:key="user._id">
                    <td>{{ user.name }}</td>
                    <td class=" screen-md:hidden">{{ user.email }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(user.createdAt) }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(user.updatedAt) }}</td>
                    <td v-if="user.role === 'admin'">Admin</td>
                    <td v-else-if="user.role === 'pending'">pending</td>
                    <td v-else>user</td>
                    <td @click="openPopup(user._id)"><i class="fa fa-pen hover:text-green-500"></i>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- user edit sec -->
    <div id="popup-modal" v-if="popup"
        class="flex fixed top-0 left-0 right-0 bottom-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center"
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

            <!-- form -->
            <form class=" grid py-20" @submit.prevent="update" method="POST">
                <h1 class=" text-xl font-bold ">User Details</h1>
                <div class="">
                    <input id="name" name="name" type="name" v-model="updateUser.name" autocomplete="name" disabled
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
                </div>
                <div class="">
                    <input id="name" name="name" type="name" v-model="updateUser.email" autocomplete="email" disabled
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
                </div>
                <div class="">
                    <input id="salary" name="salary" type="number" v-model="updateUser.salary" min="0" required
                        placeholder="Salary"
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2" />
                </div>
                <div>
                    <select name="" id="" v-model="updateUser.designation"
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                        <option value="">Select Designation</option>
                        <option :value="designation._id" v-bind:key="designation._id"
                            v-for="designation in designationState.designations">{{ designation.name }}</option>
                    </select>
                </div>
                <div>
                    <select name="" id="" v-model="updateUser.reportPerson"
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                        <option value="">Select Report Person</option>
                        <option :value="user._id" v-bind:key="user._id" v-for="user in userState.users">{{ user.name }}
                        </option>
                    </select>
                </div>
                <div>
                    <select name="" id="" v-model="updateUser.role"
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                        <option value="">Select user Role</option>
                        <option value="user">Normal User</option>
                        <option value="admin">Admin</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <div>
                    <button type="submit"
                        class=" group relative flex w-fit justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 mx-auto text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                        update
                    </button>
                </div>
            </form>
        </div>
    </div>
    <AdminSpeedMenu />
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import AdminSpeedMenu from '@/components/AdminSpeedMenu.vue'
export default {
    components: { AdminSpeedMenu },
    computed: mapGetters({
        userState: "getUserState",
        designationState: "getDesignationState",
    }),
    data() {
        return {
            updateUser: {
                _id: '',
                email: '',
                name: '',
                role: '',
                designation: '',
                salary: 0,
                reportPerson: '',
            },
            popup: false,
        }
    },
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM Do YYYY, h:mm a')
            }
        },
        update: async function () {
            this.$store.dispatch("updateUser", this.updateUser);
            this.closePopup();
            this.$store.dispatch('getAllUsersForAdmin')
        },
        delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },
        openPopup(id) {
            this.$store.dispatch("getUserById", id);
            this.delay(1000).then(() => this.setdata());
        },
        closePopup() {
            this.popup = false;
        },
        setdata() {
            this.popup = !this.popup;
            this.updateUser._id = this.userState.otherUser._id;
            this.updateUser.email = this.userState.otherUser.email;
            this.updateUser.name = this.userState.otherUser.name;
            this.updateUser.role = this.userState.otherUser.role;
            this.updateUser.salary = this.userState.otherUser.salary;
            if (this.userState.otherUser.designation) {
                this.updateUser.designation = this.userState.otherUser.designation._id;
            }
            if (this.userState.otherUser.reportPerson) {
                this.updateUser.reportPerson = this.userState.otherUser.reportPerson._id;
            }
        },
    },
    created() {
        this.$store.dispatch('getAllUsersForAdmin')
        this.$store.dispatch("getAllDesignations");
    }
}
</script>
