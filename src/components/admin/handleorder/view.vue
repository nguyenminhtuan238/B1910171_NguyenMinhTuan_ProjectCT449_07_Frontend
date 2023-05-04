<template>
<div>
    <router-link :to="{name:'order'}"><i class="fas fa-angle-left"></i></router-link>
    <table class="table mt-3">
           
  <thead>
    <tr>
        
      <th scope="col">Tên Sản Phẩm</th>
      <th scope="col">Hình Ảnh</th>
      <th scope="col">Giá</th>
      <th scope="col"> Sô lượng</th>
      <th scope="col">Thành tiền</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="item in stoorder.dt" :key="item._id">
           <td>{{ item.tilte }}</td>
            <td><img :src="`http://localhost:5001/api/Imgproducts/` + item.Img"  class="w"></td>
             <td>{{item.Price.toLocaleString() }} VND</td>
         <td>{{item.quancity}}</td>
          <td>{{ (item.quancity*item.Price).toLocaleString() }} VND</td>
      </tr>
  </tbody>
</table>
</div>
     
</template>

<script>
import { orderstore } from "@/stores/order";
export default {
    setup () {
        
          const stoorder=orderstore()
        return {stoorder}
    },
    props:['id'],
    mounted() {
    this.stoorder.findcart(this.id);
  },
}
</script>

<style  scoped>
.w{
  width: 150px;
}
</style>