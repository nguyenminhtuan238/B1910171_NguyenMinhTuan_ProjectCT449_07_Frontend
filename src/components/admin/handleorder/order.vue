<template>
     <table class="table mt-3">
      
  <thead>
    <tr>
      <th scope="col">Tên Khách Hàng</th>
      <th scope="col">Số Điện Thoại</th>
      <th scope="col">Địa Chỉ </th>
      <th scope="col">Tổng Tiên</th>
      <th scope="col">Xem</th>
      <th scope="col">Duyệt</th>
    </tr>
  </thead>
  <tbody>
      <tr v-for="item in stoorder.DH" :key="item._id">
           <td>{{item.Name}}</td>
            <td>{{item.Phone}}</td>
             <td>{{item.Address}}</td>
          <td>{{item.Total.toLocaleString()}} VND</td>
          <td class="td-success"><router-link :to="{name:'vieworder',params:{id:item._id}}"><i class="far fa-eye "></i></router-link></td>
          <td><a href="#" @click="handleCheck(item._id)"><i class="fas fa-check"></i></a></td>
      </tr>
  </tbody>
</table>
</template>

<script>
import { orderstore } from "@/stores/order";
export default {
    setup () {
        const stoorder=orderstore()
        stoorder.getDH()
        return {stoorder}
    },
    methods:{
        async handleCheck(id){
           await  this.stoorder.Check(id)
        }
    }
}
</script>

<style  scoped>

</style>