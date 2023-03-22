<template>
    <ul role="list" class="p-6 divide-y divide-black">
        <li v-for="user in users" v-bind:key="user._id" class="flex py-4 first:pt-0 last:pb-0">
            <div class="w-fit  text-xs">
                <img class="h-10 w-10 rounded-full float-right"
                    :src="user.imageurl"
                    alt="" />
            </div>
            <div class="ml-3 w-full overflow-hidden ">
                <p class="text-sm font-medium text-slate-900 text-left">{{user.name}}</p>
                <p class="text-sm text-slate-500 truncate text-left">{{user.designation.name}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['users'],
}
</script>
