<template>
  <form @submit.prevent="handle">
    <div class="form-group">
      <label for="exampleInputEmail1">Tên sản phẩm</label>
      <input
        type="text"
        v-model="title"
        class="form-control"
        placeholder="Nhập tên "
        required
      />
    </div>
    <p class="text-center text-danger">{{ stoproducts.err }}</p>
    <div class="form-group">
      <label for="exampleInputPassword1">Hình Ảnh</label>
      <input
        type="file"
        @change="handleFileUpload($event)"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
      />
     
    </div>
      <div class="form-group">
      <label >Giá</label>
      <input
        type="number"
        v-model="price"
        class="form-control"
        placeholder="Nhập Giá "
        required
      />
    </div>
     <div class="form-group">
      <label >Kho</label>
      <input
        type="number"
        v-model="Kho"
        class="form-control"
        placeholder="Nhập Kho "
        required
      />
    </div>
    <button class="btn btn-primary">Thêm</button>
    <div
      v-if="stoproducts.loading"
      class="d-flex justify-content-center align-items-cente"
    >
      <div class="spinner-border"></div>
    </div>
    <div v-else>
      <table class="table mt-3">
  <thead>
    <tr>
      <th scope="col">Tên Sân Phẩm</th>
      <th scope="col">Hình Ảnh </th>
      <th scope="col">Giá </th>
      <th scope="col">Kho </th>
      <th scope="col">Xóa</th>
      <th scope="col">Sửa</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in stoproducts.data" :key="item._id">
      <th >{{ item.tilte }}</th>
      <td> <img :src="`http://localhost:5001/api/Imgproducts/` + item.Img"  class="w"></td>
      <td>{{item.Price.toLocaleString()}} VND</td>
      <td>{{item.Kho}}</td>
      <td>  
        <span class="dale btn btn-primary p-1 ml-5"
          ><i @click="handledelete(item._id)" class="fas fa-trash"></i
        ></span>
      </td>
      <td>  <router-link :to="{name:'updateproducts',params:{id:item._id}}">
          <span class="dale btn btn-success p-1 ml-5">
            <i class="fas fa-edit"></i>
          </span>
        </router-link>
        </td>
    </tr>
  </tbody>
</table>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { productsStore } from "@/stores/products";
import Swal from "sweetalert2";
export default {
  setup() {
    const stoproducts = productsStore();
    const title = ref("");
    const file = ref("");
    const price=ref(1);
    const Kho=ref(1)
    stoproducts.getPageProducts();
    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };
    const handledelete = (id) => {
      Swal.fire({
        title: "Bạn Có Chắc Là Xóa",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText:"Không",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng Ý",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Xóa", "Sản phẩm đã bị xóa", "success").then(
            (resu) => {
              if (resu.isConfirmed) {
                stoproducts.deleteproducts(id);
              }
            }
          );
        }
      });
    };
    const handle = () => {
      const data = {
        title: title.value,
        img: file.value,
        Kho:Kho.value,
        Price:price.value,
      };
      stoproducts.addproducts(data);
      title.value = "";
      price.value=1
      Kho.value=1
      stoproducts.err=null
    };
    
    return {
      stoproducts,
      title,
      price,
      Kho,
      handle,
      handleFileUpload,
      handledelete,
    };
  },
};
</script>
<style scoped>
.dale {
  cursor: pointer;
}
.w{
  width: 150px;
}
</style>