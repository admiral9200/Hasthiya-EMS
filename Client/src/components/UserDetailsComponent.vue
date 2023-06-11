<template>
  <!-- profile -->
  <div class="p-4 bg-slate-200 md:p-16">
      <div class="p-8 bg-white shadow-xl mt-24 rounded-lg">
        <!-- user img -->
        <div
          class="relative w-40 h-40 mx-auto rounded-full shadow-2xl  top-0 -mt-24 flex items-center justify-center bg-white">
          <img :src="user.imageurl" alt="" class=" rounded-full ">
        </div>
  
        <div class="mt-20 border-b pb-12">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  
            <div class=" text-left">
              <h1 class=" text-xs font-medium text-gray-400">Full Name</h1>
              <h1 class="text-base font-medium text-gray-700" v-if="user.name">{{ user.name }} </h1>            
              <h1 class="text-base font-medium text-gray-700" v-else>-</h1>
            </div>
  
            <div class=" text-left">
              <h1 class=" text-xs font-medium text-gray-400">Email</h1>
              <h1 class="text-base font-medium text-gray-700" v-if="user.email">{{ user.email }} </h1>            
              <h1 class="text-base font-medium text-gray-700" v-else>-</h1>
            </div>
  
            <div class=" text-left">
              <h1 class=" text-xs font-medium text-gray-400">Designation</h1>
              <h1 class="text-base font-medium text-gray-700" v-if="user.designation.name">{{ user.designation.name }} </h1>            
              <h1 class="text-base font-medium text-gray-700" v-else>-</h1>
            </div>
  
            <div class=" text-left">
              <h1 class=" text-xs font-medium text-gray-400">Birthday</h1>
              <h1 class="text-base font-medium text-gray-700" v-if="user.dob">{{ formatDate(user.dob) }}</h1>            
              <h1 class="text-base font-medium text-gray-700" v-else>-</h1>
            </div>
  
            <div class=" text-left">
              <h1 class=" text-xs font-medium text-gray-400">NIC</h1>
              <h1 class="text-base font-medium text-gray-700" v-if="user.nic">{{ user.nic }} </h1>            
              <h1 class="text-base font-medium text-gray-700" v-else>-</h1>
            </div>
  
            <div class=" text-left">
              <h1 class=" text-xs font-medium text-gray-400">Report Person</h1>
              <h1 class="text-base font-medium text-gray-700" v-if="user.reportPerson.name">{{ user.reportPerson.name }} </h1>            
              <h1 class="text-base font-medium text-gray-700" v-else>-</h1>
            </div>
  
            <div class=" text-left">
              <h1 class=" text-xs font-medium text-gray-400">Adderss</h1>
              <h1 class="text-base font-medium text-gray-700" v-if="user.address">{{ user.address }} </h1>            
              <h1 class="text-base font-medium text-gray-700" v-else>-</h1>
            </div>
          </div>        
        </div>
        <div class="grid grid-cols-3 md:grid-cols-10 gap-4 py-2">
            <div v-for="tech in user.technologies" v-bind:key="tech._id"
              class=" px-3 rounded-md bg-slate-300 mr-2 hover:bg-slate-400 hover:text-white"
              >{{ tech.name }}</div>
          </div>
      </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['user'],
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format(' Do MMMM YYYY')
            }
        },
    },
}
</script>
