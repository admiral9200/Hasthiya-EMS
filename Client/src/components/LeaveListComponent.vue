<template>
    <div class=" bg-slate-200 mx-4 rounded-lg shadow-sm mb-10">
        <table class=" w-full overflow-scroll">
            <thead>
                <th>Leave ID</th>
                <th class=" screen-md:hidden">LEAVE TYPE</th>
                <th class=" screen-md:hidden">REQUESTED ON</th>
                <th class=" screen-md:hidden">LEAVE FROM</th>
                <th class=" screen-md:hidden">LEAVE TO</th>
                <th class=" screen-md:hidden">DURATION</th>
                <th>STATUS</th>
                <th>CANCEL</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="leave in leaves" v-bind:key="leave._id">
                    <td>{{ leave._id }}</td>
                    <td class=" screen-md:hidden" v-if="leave.isMedical">Medical</td>
                    <td class=" screen-md:hidden" v-else>Casual</td>
                    <td class=" screen-md:hidden">{{ formatDate(leave.createdAt) }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(leave.leaveFrom) }}</td>
                    <td class=" screen-md:hidden" v-if="leave.isOneday">{{ formatDate(leave.leaveFrom) }}</td>
                    <td class=" screen-md:hidden" v-else>{{ formatDate(leave.leaveTo) }}</td>
                    <td class=" screen-md:hidden" v-if="leave.isOneday && leave.isFullday">1 day</td>
                    <td class=" screen-md:hidden" v-else-if="leave.isOneday && !leave.isFullday">Half day</td>
                    <td class=" screen-md:hidden" v-else>{{ daysDiff(leave.leaveFrom, leave.leaveTo) }} days</td>
                    <td class=" screen-md:hidden">{{ leave.status }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['leaves'],

    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY')
            }
        },
        daysDiff(startDate, endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = Math.abs(end - start);
            const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
            return Math.round(diff / oneDay);
        },
    }
}
</script>
