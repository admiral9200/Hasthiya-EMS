<template>
  <div class="heading text-left py-4 pl-4 font-semibold">Assets Types</div>
  <ul class="px-3 pb-2 divide-y divide-slate-300">
    <li v-for="assetsType in assetsTypeState.assetsTypes" v-bind:key="assetsType._id"
      class="text-left px-1 font-normal ">
      <router-link :to="{ name: 'assetsByType', params: { id: assetsType._id }, query: { page: 1 }, }">
        <button>{{ assetsType.name }}</button>
      </router-link>
    </li>
  </ul>
</template>
 
<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters({
    assetsTypeState: "getAssetsTypeState",
  }),
  created: function () {
    this.$store.dispatch("getAllAssetsTypes");
  },
}
</script>
 
<style></style>