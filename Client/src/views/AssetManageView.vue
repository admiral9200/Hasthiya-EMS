<template>
    <!-- form -->
    <div
        class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6  lg:px-8 fixed inset-0 z-10 overflow-y-auto bg-blue-50">
        <div class=" w-full  max-w-6xl space-y-8 bg-white py-16 px-12 rounded-lg drop-shadow-2xl">
            <div>
                <h2 v-if="!AssetId" class=" mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
                    Add Assets
                </h2>
                <h2 v-if="AssetId" class=" mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 ">
                    Edit Assets
                </h2>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="submit" method="POST">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div>
                        <input id="name" name="name" type="name" v-model="asset.name" autocomplete="name" required=""
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="Add assets name" />
                    </div>
                    <div>
                        <input id="serialNumber" name="serialNumber" type="serialNumber" v-model="asset.serialNumber"
                            autocomplete="serialNumber" required=""
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="Add serial number" />
                    </div>
                    <div>
                        <select name="" id="" v-model="asset.type"
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                            <option value="">Select category</option>
                            <option :value="category._id" v-bind:key="category._id"
                                v-for="category in assetsTypeState.assetsTypes">{{ category.name }}</option>
                        </select>
                    </div>
                    <div>
                        <select name="" id="" v-model="asset.assignPerson"
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2">
                            <option value="">Select assignee</option>
                            <option :value="user._id" v-bind:key="user._id" v-for="user in filteruser(userState.users)">{{
                                user.name }}
                            </option>
                        </select>
                    </div>
                    <div>
                        <input id="date" name="date" type="date" v-model="asset.assignDate" autocomplete="date"
                            class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mb-2"
                            placeholder="assign date" />
                    </div>
                </div>
                <div>
                    <button type="submit"
                        class=" group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    async created() {
        if (this.AssetId) {
            await this.$store.dispatch("getAssetById", this.AssetId);
            this.asset.name = this.assetState.asset.name
            this.asset.type = this.assetState.asset.type._id
            this.asset.serialNumber = this.assetState.asset.serialNumber
            this.asset.assignPerson = this.assetState.asset.assignPerson._id
            this.asset.assignDate = this.formatDate(this.assetState.asset.assignDate)
        }
        this.$store.dispatch("getAllAssetsTypes");
        this.$store.dispatch("getAllUsersForAdmin");
    },
    computed: mapGetters({
        userState: "getUserState",
        assetsTypeState: "getAssetsTypeState",
        assetState: "getAssetState",
    }),
    data() {
        return {
            asset: {
                name: '',
                type: '',
                serialNumber: '',
                assignPerson: '',
                assignDate: '',
            },
            AssetId: this.$route.params.AssetId,
        }
    },
    methods: {
        submit: async function () {
            if (this.AssetId) {
                if (this.asset.assignPerson == '' || this.asset.assignPerson == null) {
                    this.$store.dispatch("updateAsset", { _id: this.AssetId, name: this.asset.name, type: this.asset.type, serialNumber: this.asset.serialNumber, assignPerson: null, assignDate: null });
                } else {
                    this.$store.dispatch("updateAsset", { _id: this.AssetId, name: this.asset.name, type: this.asset.type, serialNumber: this.asset.serialNumber, assignPerson: this.asset.assignPerson, assignDate: this.asset.assignDate });
                }
            } else {
                if (this.asset.assignPerson == '' || this.asset.assignPerson == null) {
                    this.$store.dispatch("createAsset", { name: this.asset.name, type: this.asset.type, serialNumber: this.asset.serialNumber });
                } else {
                    this.$store.dispatch("createAsset", { name: this.asset.name, type: this.asset.type, serialNumber: this.asset.serialNumber, assignPerson: this.asset.assignPerson, assignDate: this.asset.assignDate });
                }
            }
            router.go(-1)
        },
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('YYYY-MM-DD')
            }
        },
        filteruser(users) {
            const filteredUsers = users.filter(function (user) {
                return user.role !== "pending";
            });
            return filteredUsers;
        }
    },
}
</script>