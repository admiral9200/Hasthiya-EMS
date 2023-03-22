<template>
    <!-- form -->
    <div
        class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6  lg:px-8 fixed inset-0 z-10 overflow-y-auto bg-blue-50">
        <div class=" w-full  max-w-6xl space-y-8 bg-white py-16 px-12 rounded-lg drop-shadow-2xl">
            <div>
                <h2 class=" mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
                    Edit Profile
                </h2>
            </div>
           
            <div class=" md:grid md:grid-cols-2">
            <div>
                <img :src="user.imageurl" alt="user image" class=" md:h-56 md:mt-7 h-28 mx-auto">
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="submit" method="POST">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <input id="name" name="name" type="name" v-model="user.name" autocomplete="name"
                            required=""
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="Your name" />
                    </div>
                    <div>
                        <input id="imageurl" name="imageurl" type="imageurl" v-model="user.imageurl" autocomplete="imageurl"
                            required=""
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="Your image url" />
                    </div>
                    <div>
                        <select name="" id="" v-model="user.technologies"
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                            <option value="">Select Technology</option>
                            <option :value="technology._id" v-bind:key="technology._id" v-for="technology in technologyState.technologies">{{ technology.name }}
                            </option>
                    </select>
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class=" group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                        Update
                    </button>
                </div>
            </form>
        </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters({
        userState: "getUserState",
        technologyState: "getTechnologyState",
    }),
    created(){
        this.setdata();
    },
    data() {
        return {
            user: {
                name: '',
                imageurl: '',
                technologies:[],
            },
        }
    },
    methods: {
        submit: async function () {
            this.$store.dispatch("updateUser", { _id:this.userState.user._id, name:this.user.name,imageurl:this.user.imageurl});
            router.go(-1)
        },
        setdata(){
            this.user.name=this.userState.user.name
            this.user.imageurl=this.userState.user.imageurl
            this.user.technologies=this.userState.user.technologies
        }
    },
}
</script>

<style>

</style>