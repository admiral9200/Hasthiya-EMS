<template>
    <table class=" w-full overflow-scroll">
            <thead>
                <th>Model</th>
                <th class=" screen-md:hidden">Asset Type</th>
                <th class=" screen-md:hidden">Serial Number</th>
                <th class=" screen-md:hidden">Asset Assignee</th>
                <th class=" screen-md:hidden">Recived Date</th>
            </thead>
            <tbody>
                <tr class="odd:bg-white even:bg-slate-50" v-for="asset in assets" v-bind:key="asset._id">
                    <td>{{ asset.name }}</td>
                    <td class=" screen-md:hidden ">{{ asset.type.name }}</td>
                    <td class=" screen-md:hidden">{{ asset.serialNumber }}</td>
                    <td class=" screen-md:hidden">{{ asset.assignPerson.name }}</td>
                    <td class=" screen-md:hidden">{{ formatDate(asset.updatedAt) }}</td>
                </tr>
            </tbody>
        </table>
</template>

<script>
export default {
    props: ['assets'],
}
</script>
