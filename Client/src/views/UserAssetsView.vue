<template>
    <!-- assets list -->
    <div class=" bg-slate-200 mx-4 rounded-lg shadow-sm mb-10">
        <table class=" w-full overflow-scroll">
            <thead>
                <th>Model</th>
                <th class=" screen-md:hidden">Asset Type</th>
                <th class=" screen-md:hidden">Serial Number</th>
                <th class=" screen-md:hidden">Asset Assignee</th>
                <th class=" screen-md:hidden">Recived Date</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="asset in assetState.assets" v-bind:key="asset._id">
                    <td>{{ asset.name }}</td>
                    <td class=" screen-md:hidden ">{{ asset.type.name }}</td>
                    <td class=" screen-md:hidden">{{ asset.serialNumber }}</td>
                    <td class=" screen-md:hidden">{{ asset.assignPerson.name }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(asset.updatedAt) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
    computed: mapGetters({
        assetState: "getAssetState",
        userState: "getUserState",
    }),
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MMMM Do YYYY')
            }
        },
    },
    created() {
        this.$store.dispatch('getAllAssetsByUser', this.userState.user._id)
    },
}
</script>
