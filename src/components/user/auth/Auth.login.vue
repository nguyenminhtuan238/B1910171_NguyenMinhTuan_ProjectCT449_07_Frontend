<template>
  <div class=" mb-5 mt-4  border border-light" >
    
    <form @submit.prevent="HandleLogin" class="bg-light p-5 w-50 border border-light mx-auto ">
      <h1 class="text-center h3 mb-3">Đăng Nhập</h1>
  <div class="form-group" >
    <label for="exampleInputEmail1">Tên Đăng Nhập</label>
    <input type="text" v-model="Username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username">
  <span class="d-flex justify-content-center align-content-lg-center text-danger">{{AuthLogin.err}}</span>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" >Mật Khẩu</label>
    <input type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="Password">
     <span class="d-flex justify-content-center align-content-lg-center text-danger">{{AuthLogin.err}}</span>
  </div>
  <button type="submit" class="btn btn-primary btn-block">Đăng Nhập</button>
   <router-link class="nav-link" :to="{name:'Register'}">Đăng Ký<span class="sr-only">(current)</span></router-link>
</form>
  </div>
</template>
<script>
import { Authstore } from "@/stores/auth";
import { ref } from 'vue';
export default {
 setup(){
     const AuthLogin=Authstore()
     const Username=ref("")
     const password=ref("")
    return {AuthLogin,Username,password}
 },
   methods:{
      HandleLogin(){
        const data={
            username:this.Username,
            password:this.password
        }
       this.AuthLogin.Login(data)
        this.Username=""
        this.password=""
       
    }
   }
}
</script>
<style >

</style>