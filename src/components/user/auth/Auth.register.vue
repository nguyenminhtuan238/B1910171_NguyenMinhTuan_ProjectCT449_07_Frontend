<template>
 <div class=" border border-light mt-3" >
  <form @submit.prevent="HandleRegister"  class="bg-light p-5 w-50 border border-light mx-auto ">
     <h1 class="text-center h3 mb-3">Đăng Ký</h1>
  <div class="form-group" >
    <label for="exampleInputEmail1">Tên Đăng Nhập</label>
    <input type="text" v-model="Username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" >Mật Khẩu</label>
    <input type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="Password">
  </div>
   <div class="form-group">
    <label for="exampleInputPassword1" >Tên </label>
    <input type="text" class="form-control" v-model="Name"  placeholder="Nhập Tên">
  </div>
<div class="form-group">
    <label for="exampleInputPassword1" >Số điện Thoại</label>
    <input type="number" class="form-control" v-model="Phone" placeholder="Nhập Số Điện Thoại">
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1" >Địa Chỉ</label>
    <input type="text" class="form-control" v-model="Address"  placeholder="Nhập Địa Chỉ">
  </div>
 <span class="d-flex justify-content-center align-content-lg-center text-danger">{{Authregister.err}}</span>
  <button type="submit" class="btn btn-primary btn-block">Đăng Ký</button>
  <div class="dropdown">
  <div>
 
</div>

</div>
</form>
 </div>
</template>
<script>
import { Authstore } from "@/stores/auth";
import { ref } from 'vue';

export default {
 setup(){
     const Authregister=Authstore()
     const Username=ref("")
     const password=ref("")
    const Phone=ref("")
      const Address=ref("")
        const Name=ref("")
    return {Authregister,Username,password,Phone,Address,Name}
 },
 data(){
   return{
     selectedItem:'',
   }
 },
   methods:{
      HandleRegister(){
        const data={
            username:this.Username,
            password:this.password,
            Name:this.Name,
            Address:this.Address,
            Phone:this.Phone

        }
        this.Authregister.Register(data)
    }
   }
}
</script>