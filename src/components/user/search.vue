<template>

   <div class="row">
      <div
        v-if="stoproducts.loading"
        class="d-flex justify-content-center align-items-cente"
      >
        <div class="spinner-border"></div>
      </div>
      <div v-if="stoproducts.pd.length<=0" class="text-center col-12"> 
        Không Có Sản Phẩm
      </div>
      <div class="col-12 h1 text-center text-danger" v-else> 
        {{id}}
      </div>
      <div
        v-for="item in stoproducts.pd"
        :key="item._id"
        class="col-md-4 col-sm-6"
      >
        <div class="card mb-30">
          <div class="inner">
            <img
              :src="`http://localhost:5001/api/Imgproducts/` + item.Img"
              class="w-100"
            />
          </div>
          <div class="card-body text-center">
            <h4 class="card-title">{{ item.tilte }}</h4>
            <p class="text-muted">{{ item.Price.toLocaleString() }} VND</p>
            <button
              class="btn btn-outline-primary btn-sm"
              @click="handlecart(item._id)"
            >
              <i class="fas fa-shopping-cart"></i> Thêm Vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import {productsStore} from "@/stores/products"
export default {
  setup() {
    const stoproducts=productsStore()
    return {stoproducts}
  },
  props: ["id"],
   watch: {
      async id(){
             await this.stoproducts.search(this.id)
        }
  },
  methods:{
      async  handlecart(id){
     await this.stoproducts.addcart(id)
    },
    async search(){
        await this.stoproducts.search(this.id)
    }
  },
  mounted(){
      this.search()
  }
 
};
</script>
<style scoped>
</style>
