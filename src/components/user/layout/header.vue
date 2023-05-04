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
        <router-link class="nav-link" :to="{name:'products'}"><a class="dropdown-item"  href="#">Trang Chủ</a></router-link>
      </li>
      <li class="nav-item">
         <router-link class="nav-link" :to="{name:'cart'}"><a class="dropdown-item"  href="#"><i class="fas fa-shopping-cart"></i>
         <span class="badge badge-light">{{this.products.countcart}}</span></a></router-link>
      </li>
    
      <li class="nav-item" v-if="!auth.user" >
          <router-link class="nav-link" :to="{name:'login'}"><a class="dropdown-item"  href="#">Đăng Nhập</a> </router-link>
      </li>
    </ul>
    <div class="nav-item" v-if="auth.user">
        <router-link class="nav-link" :to="{name:'IFM'}"><img :src="auth.user.image?`http://localhost:5001/api/ImgUser/` + auth.user.image:`http://localhost:5001/api/ImgUser/user.png`" class="img-thumbnail w "/> </router-link>
    </div>
   
    <div class="nav-item" v-if="auth.user">
         <router-link class="nav-link" :to="{name:'Home'}"><a class="dropdown-item" @click="logout" href="#">Logout</a></router-link>
    </div>
    <form class="form-inline my-2 my-lg-0"  @submit.prevent="Handle">
      <input class="form-control mr-sm-2" type="search" placeholder="Tìm" v-model="search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Tìm Kiếm</button>
    </form>
  
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
      localStorage.removeItem("User")
      auth.user=null
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
    .w{
      width: 50px;
    }
</style>>

