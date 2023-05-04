<template>
 <div>
     <legend class="text-danger mt-3">Hóa Đơn</legend>
       <router-link :to="{name:'IFM'}"><i class="fas fa-angle-left"></i></router-link>
      <table class="table mt-3">
     
  <thead>
    <tr>
      <th scope="col">Tên Khách Hàng</th>
      <th scope="col">Số Điện Thoại</th>
      <th scope="col">Địa Chỉ </th>
      <th scope="col">Tổng Tiên</th>
      <th scope="col">Trạng Thái</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="item in stoorder.DH" :key="item._id">
           <td>{{item.Name}}</td>
            <td>{{item.Phone}}</td>
             <td>{{item.Address}}</td>
          <td>{{item.Total.toLocaleString()}} VND</td>
          <td>Đã Nhận Hàng</td>

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
        stoorder.getUserHD()
        return {stoorder}
    },
}
</script>

<style  scoped>

</style>