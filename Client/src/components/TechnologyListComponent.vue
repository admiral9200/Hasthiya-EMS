<template>
  <div class="heading text-left py-4 pl-4 font-semibold">Technologies</div>
  <ul class="px-3 pb-2 divide-y divide-slate-300">
    <li v-for="technology in technologyState.technologies" v-bind:key="technology._id"
      class="text-left px-1 font-normal ">
      <router-link :to="{ name: 'userByTech', params: { id: technology._id }, query: { page: 1 }, }">
        <button>{{ technology.name }}</button>
      </router-link>
    </li>
  </ul>
</template>
 
<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    technologyState: "getTechnologyState",
  }),
  created: function () {
    this.$store.dispatch("getAllTechnology");
  },
}
</script>
 
<style></style>