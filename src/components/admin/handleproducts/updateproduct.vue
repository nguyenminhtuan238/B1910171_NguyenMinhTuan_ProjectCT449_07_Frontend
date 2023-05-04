<template>
  <form @submit.prevent="handle">
    <div class="form-group">
      <label for="exampleInputEmail1">Tên Thú cưng</label>
      <input
        type="text"
        v-model="title"
        class="form-control"
        placeholder="Nhập tên "
        required
      />
    </div>
    <span>{{ stoproducts.err }}</span>
    <div class="form-group">
      <label for="exampleInputPassword1">Hình Ảnh</label>
      <input
        type="file"
        @change="handleFileUpload($event)"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
      />
      <a class="btn btn-primary form-control" @click="Handleadd">them Anh</a>
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
    <button class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { productsStore } from "@/stores/products";
import Swal from "sweetalert2";
export default {
  props: ["id"],
  data() {
    return {
      data: [],
    };
  },
  setup() {
    const stoproducts = productsStore();
    const title = ref("");
    const file = ref("");
    const price=ref(1);
    const Kho=ref(1)
    const handleFileUpload = (event) => {
      file.value = event.target.files[0];
    };
    const Handleadd = () => {
      document.getElementById("exampleInputPassword1").click();
    };
    return {
      stoproducts,
      file,
      title,
      price,
      Kho,
      handleFileUpload,
      Handleadd,
    };
  },
  methods: {
    async handle() {
      const data = {
        title: this.title,
        img: this.file,
        Kho:this.Kho,
        Price:this.price
      };
      await this.stoproducts.updateproducts(this.id, data);
      if (this.stoproducts.loading) {
        Swal.fire({
          title: "Thêm thành công",
          icon: "success",
        }).then((resl) => {
          if (resl.isConfirmed) {
             this.$router.go(-1)
          }
        });
      }
    },
    async getone() {
      await this.stoproducts.getoneProduct(this.id);
      this.title = this.stoproducts.data.tilte;
       this.Kho = this.stoproducts.data.Kho;
        this.price = this.stoproducts.data.Price;
    },
  },
  mounted() {
    this.getone();
  },
};
</script>
<style scoped>
.dale {
  cursor: pointer;
}
</style>