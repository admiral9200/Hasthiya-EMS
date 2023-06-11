<template>
  <!-- profile -->
  <user-details-component :user="userState.otherUser" />
</template>
  
<script>
import { mapGetters } from 'vuex'
import UserDetailsComponent from '@/components/UserDetailsComponent.vue';
export default {
  components: { UserDetailsComponent },
  data() {
    return {
      page: 1,
    }
  },
  computed: mapGetters({
    userState: "getUserState",
  }),
  created() {
    this.$store.dispatch("getUserById",this.$route.params.id);
  },
}
</script>