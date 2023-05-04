<template>
  <div class="mt-3">
    <div class="row">
      <div
        v-if="stoproducts.loading"
        class="d-flex justify-content-center align-items-center col-12"
      >
        <div class="spinner-border"></div>
      </div>
      <div
        v-for="item in stoproducts.data"
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
            <router-link :to="{name:'detail',params:{id:item._id}}" class="text-decoration-none text-dark card-title h4">{{ item.tilte }}</router-link>
            <p class="text-muted">{{stoproducts.loading?0:item.Price.toLocaleString()}} VND</p>
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
    <div class="d-flex justify-content-center mt-5">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" @click="handlemovepage(`Previous`)"
            ><span aria-hidden="true">&laquo;</span></a
          >
        </li>
        <li
          class="page-item"
          :class="this.stoproducts.getpage == pages ? `active` : ``"
          v-for="pages in stoproducts.page"
          :key="pages"
        >
          <a class="page-link" href="#" @click="handlepage(pages)">{{
            pages
          }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" @click="handlemovepage(`Next`)"
            ><span aria-hidden="true">&raquo;</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { productsStore } from "@/stores/products";
export default {
  setup() {
    const stoproducts = productsStore();
    stoproducts.getProducts();
    stoproducts.getPageProducts(1);
    return { stoproducts };
  },
 
  methods: {
    async handlecart(id) {
      await this.stoproducts.addcart(id);
    },
    async handlemovepage(move) {
      if (move === "Next") {
        this.stoproducts.getpage =
          this.stoproducts.getpage == this.stoproducts.page
            ? this.stoproducts.page
            : this.stoproducts.getpage + 1;
        await this.stoproducts.getPageProducts(this.stoproducts.getpage);
      }
      if (move === "Previous") {
        this.stoproducts.getpage =
          this.stoproducts.getpage <= 1 ? 1 : this.stoproducts.getpage - 1;
        await this.stoproducts.getPageProducts(this.stoproducts.getpage);
      }
    },
    async handlepage(page) {
      this.stoproducts.getpage = page;
      await this.stoproducts.getPageProducts(page);
    },
  },
};
</script>
<style scoped>
</style>
