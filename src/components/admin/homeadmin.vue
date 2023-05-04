<template>
  <div class="container">
    <HeaderVue/>
  <router-view></router-view>
  </div>
  
</template>
<script>
import HeaderVue from '@/components/admin/layout/header.vue';
export default {
  components:{
    HeaderVue
  },
  
};
</script>
<style scoped>
</style>
