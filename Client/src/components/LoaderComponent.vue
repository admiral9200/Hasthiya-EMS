<template>
  <div class=" bg-slate-100 fixed inset-0 w-auto h-full justify-center flex content-center py-40">
    <img src="../assets/loader-2.gif" alt="" class=" ">
  </div>
</template>

<script>
export default {
    created: function(){
        return this.$router.push("/");
    },
}
</script>

<style>

</style>