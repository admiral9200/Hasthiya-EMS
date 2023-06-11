<template>
    <h2 class="my-6 mx-7 text-left text-3xl font-bold tracking-tight text-gray-900">
        Technologies :
    </h2>
    <!--form -->
    <div class="mx-4 mt-3 pb-7">
        <form @submit.prevent="submit" method="POST">
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Add</label>
            <div class="relative">
                <input type="name" v-model="technology.name" id="name"
                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 "
                    placeholder="add technology" required>
                <button type="submit"
                    class="text-white absolute right-2.5 bottom-2.5 bg-Gray-700 hover:bg-Gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">Submit</button>
            </div>
        </form>
    </div>

    <!-- technology list -->
    <div class=" bg-slate-200 mx-4 rounded-lg shadow-sm mb-10">
        <table class=" w-full overflow-scroll">
            <thead>
                <th>Name</th>
                <th class=" screen-md:hidden">Added By</th>
                <th class=" screen-md:hidden">Added On</th>
                <th class=" screen-md:hidden">Updated By</th>
                <th class=" screen-md:hidden">Updated On</th>
                <th>Edit</th>
                <th>Delete</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="technology in technologyState.technologies"
                    v-bind:key="technology._id">
                    <td>{{ technology.name }}</td>
                    <td class=" screen-md:hidden">{{ technology.addedBy.name }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(technology.createdAt) }}</td>
                    <td class=" screen-md:hidden">{{ technology.updatedBy.name }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(technology.updatedAt) }}</td>
                    <td @click="openPopup(technology._id, technology.name)"><i class="fa fa-pen hover:text-green-500"></i>
                    </td>
                    <td @click="deleteTechnology(technology._id)"><i class="fa fa-trash-can hover:text-red-500"></i></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- technology edit sec -->
    <div id="popup-modal" v-if="popup"
        class="fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full justify-center"
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
            <form class=" grid py-20" @submit.prevent="update" method="POST">
                <div class="">
                    <input id="name" name="name" type="name" v-model="updateTechnology.name" autocomplete="name"
                        required=""
                        class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                        placeholder="add technology" />
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
    <admin-speed-menu />
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import AdminSpeedMenu from '@/components/AdminSpeedMenu.vue'
export default {
    components: { AdminSpeedMenu },
    computed: mapGetters({
        technologyState: "getTechnologyState",
        userState: "getUserState",
    }),
    data() {
        return {
            technology: {
                name: '',
            },
            updateTechnology: {
                _id: '',
                name: '',
            },
            popup: false,
        }
    },
    methods: {
        submit: async function () {
            this.$store.dispatch("createTechnology", { name: this.technology.name, addedBy: this.userState.user._id, updatedBy: this.userState.user._id });
        },
        update: async function () {
            this.$store.dispatch("updateTechnology", { _id: this.updateTechnology._id, name: this.updateTechnology.name, updatedBy: this.userState.user._id });
            this.closePopup();
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM Do YYYY, h:mm a')
            }
        },
        deleteTechnology(id) {
            this.$store.dispatch("deleteTechnology", id);
        },
        openPopup(id, name) {
            this.updateTechnology.name = name;
            this.updateTechnology._id = id;
            this.popup = !this.popup;
        },
        closePopup() {
            this.popup = false;
        }
    },
    created(){
        this.$store.dispatch("getAllTechnology");
    }
}
</script>
