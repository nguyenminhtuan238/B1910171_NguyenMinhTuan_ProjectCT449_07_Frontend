<template>
  <div class="container">
    <HeaderVue/>
  <router-view></router-view>
  <FooterVue/>
  </div>
  
</template>
<script>
import HeaderVue from '@/components/user/layout/header.vue';
import FooterVue from '@/components/user/layout/footer.vue';
export default {
  components:{
    HeaderVue,
    FooterVue
  },
  
};
</script>
<style scoped>
</style>
