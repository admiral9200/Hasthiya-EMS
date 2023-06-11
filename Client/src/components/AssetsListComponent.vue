<template>
    <table class=" w-full overflow-scroll">
        <thead>
            <th>Model</th>
            <th class=" screen-md:hidden">Asset Type</th>
            <th class=" screen-md:hidden">Serial Number</th>
            <th class=" screen-md:hidden">Asset Assignee</th>
            <th class=" screen-md:hidden">Recived Date</th>
            <th class=" screen-md:hidden">Edit</th>
            <th class=" screen-md:hidden">Delete</th>
        </thead>
        <tbody>
            <tr class="odd:bg-white even:bg-slate-50" v-for="asset in assets" v-bind:key="asset._id">
                <td>{{ asset.name }}</td>
                <td class=" screen-md:hidden ">{{ asset.type.name }}</td>
                <td class=" screen-md:hidden">{{ asset.serialNumber }}</td>
                <td class=" screen-md:hidden" v-if="asset.assignPerson">{{ asset.assignPerson.name }}</td>
                <td class=" screen-md:hidden" v-else>-</td>
                <td class=" screen-md:hidden" v-if="asset.assignDate">{{ formatDate(asset.assignDate) }}</td>
                <td class=" screen-md:hidden" v-else>-</td>
                <td>
                    <router-link :to="`/editassets/${asset._id}`">
                        <i class="fa fa-pen hover:text-green-500"></i>
                    </router-link>
                </td>
                <td><i class="fa fa-trash-can hover:text-red-500"></i></td>

            </tr>
        </tbody>
    </table>
</template>

<script>
import moment from 'moment'
export default {
    props: ['assets'],
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY')
            }
        },
    }
}
</script>
