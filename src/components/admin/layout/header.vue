<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Shop</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name:'admin'}"><a class="dropdown-item" href="#">Admin</a> </router-link>
      </li>
       <li class="nav-item" v-if="auth.admin">
          <router-link class="nav-link" :to="{name:'Addproduct'}"><a class="dropdown-item" href="#">Quản lý sản phẩm</a></router-link>
      </li>
       <li class="nav-item" v-if="auth.admin">
          <router-link class="nav-link" :to="{name:'order'}"><a class="dropdown-item" href="#">Quản lý Đơn Hàng</a></router-link>
      </li>
       <li class="nav-item" v-if="auth.admin">
          <router-link class="nav-link" :to="{name:'admin'}"><a class="dropdown-item" @click="logout" href="#">Logout</a></router-link>
      </li>
    </ul>
  
  </div>
</nav>
</div>
</template>
<script>
import { Authstore } from "@/stores/auth";
import {productsStore} from "@/stores/products"
export default {
  setup(){
    const auth=Authstore()
    const products=productsStore()
    auth.getuser()
   const logout=()=>{
      localStorage.removeItem("admin")
      auth.admin=null
      window.location.reload()
    }
    return {auth,logout,products}
  },
  data(){
    return{
      search:"",
      Countcart:this.products.Countcart
    }
  },
 
  methods:{
     handlesearch(t){
       this.search=t
        this.$router.push(`/search/${this.search}`)
        this.search=""
     },
    Handle(){
      this.$router.push(`/search/${this.search}`)
      this.search=""
  },
  }
}
</script>
<style scoped>
    .active{
       display: block;
    }
</style>>

