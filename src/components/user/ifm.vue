<template>
    <div class="d-flex justify-content-center align-content-center  ">
    <div class="border border-primary p-5 mt-3 w-50">
       <form @submit.prevent="handleIFM">
  <div class="form-group">
    <label >Họ và Tên</label>
    <input type="text" class="form-control" v-model="Name" placeholder="nhập vào Họ và tên">
  </div>
  <div class="form-group">
    <label >Sô Điện Thoại</label>
    <input type="number" class="form-control" v-model="Phone" placeholder="Nhập Sô Điện Thoại">
  </div>
  <div class="form-group">
    <label >Địa Chỉ</label>
    <input type="text" class="form-control" v-model="Address" placeholder="Nhập Địa Chỉ">
  </div>
  <div class="form-group">
    <label >Hình ảnh</label>
    <input type="file"  class="form-control d-none" @change="handleFileUpload($event)" id="Fileuser">
    <a class="btn btn-primary form-control" @click="Handleadd">Thêm Hình Ảnh</a>
  </div>
  <button type="submit" class="btn btn-primary">Cập Nhật</button>
   
</form>
<div class="mt-5">
    <router-link :to="{name:'HD'}"  class="btn btn-danger  float-right">Hóa Đơn</router-link>
     <router-link :to="{name:'DH'}" class="btn btn-secondary  float-left">Đơn Hàng</router-link>
</div>
    </div>
    </div>
</template>

<script>
import { Authstore } from "@/stores/auth";
import { ref } from 'vue';
export default {
    setup () {
         const auth=Authstore()
          const Phone=ref("")
           const Name=ref("")
           const Address=ref("")
           const file=ref("")
            const handleFileUpload = (event) => {
             file.value = event.target.files[0];
        };
        return {auth,Phone,Name,Address,file,handleFileUpload}
    },
  
    methods:{
       async user(){
             await this.auth.getuser()
             this.Phone=this.auth.user.Phone
             this.Name=this.auth.user.Name
             this.Address=this.auth.user.Address
        },
   
        async handleIFM(){
            const data={
                Name:this.Name,
                Address:this.Address,
                Phone:this.Phone,
                Img:this.file
            }
           await this.auth.updateIFM(data)
        },
      Handleadd () {
      document.getElementById("Fileuser").click();
     },
    },
      mounted() {
    this.user();
  },

}
</script>

<style lang="scss" scoped>

</style>