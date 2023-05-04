<template>
  <div class="cart_section">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="cart_container">
            <div class="cart_title">
              Giỏ Hàng
              <small> có {{ this.products.countcart }} sản phẩm </small>
            </div>
            <div v-for="item in cart" :key="item._id" class="cart_items">
              <ul class="cart_list">
                <li class="cart_item clearfix">
                  <div class="cart_item_image">
                    <img
                      :src="`http://localhost:5001/api/Imgproducts/` + item.Img"
                    />
                  </div>
                  <div
                    class="cart_item_info d-flex flex-md-row flex-column justify-content-between"
                  >
                    <div class="cart_item_name cart_info_col">
                      <div class="cart_item_title">Tên Sản Phẩm</div>
                      <div class="cart_item_text">{{ item.tilte }}</div>
                    </div>

                    <div class="cart_item_quantity cart_info_col">
                      <div class="cart_item_title">Số Lượng</div>
                      <div class="cart_item_text">{{ item.quancity }}</div>
                    </div>
                    <div class="cart_item_price cart_info_col">
                      <div class="cart_item_title">Giá</div>
                      <div class="cart_item_text">
                        {{ item.Price.toLocaleString() }} VND
                      </div>
                    </div>
                    <div class="cart_item_total cart_info_col">
                      <div class="cart_item_title">Total</div>
                      <div class="cart_item_text">
                        {{ (item.quancity * item.Price).toLocaleString() }} VND
                      </div>
                    </div>
                    <div class="cart_item_total cart_info_col">
                      <div class="cart_item_title">Xóa</div>
                      <div class="cart_item_text">
                        <button
                          class="mx-auto btn btn-danger bg-danger"
                          @click="deletecart(item._id)"
                        >
                          <i class="fas fa-trash-alt "></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <h1></h1>
            </div>
            <div class="order_total">
              <div class="order_total_content text-md-right">
                <div class="order_total_title">Tổng cộng</div>
                <div class="order_total_amount">{{cart?cart.reduce((a,b)=>a+b.Price*b.quancity,0).toLocaleString():0}} VND</div>
              </div>
            </div>
            <div class="cart_buttons">
              <router-link type="button" class="button cart_button_clear" to="/" >
                  <span > Tiếp tục Mua</span> 
              </router-link>
              <button type="button" class="button cart_button_checkout" @click="handleorder">
               Mua
              </button>
               <div v-if="order.err" class="text-danger h3 mt-3">{{ order.err }}</div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderstore } from "@/stores/order";
import { productsStore } from "@/stores/products";
export default {
  setup() {
    const order = orderstore();
    const products = productsStore();
    return { order, products };
  },
  data() {
    return {
      cart:localStorage.getItem("carts")? JSON.parse(localStorage.getItem("carts")):[],
    };
  },
  methods: {
    async deletecart(id) {
      const ob = this.cart.filter((e) => e._id != id);
      if(ob.length!==0){
            this.cart = await ob;
      localStorage.setItem(
        "carts",
        JSON.stringify(this.cart.filter((e) => e._id != id))
      );
      this.products.countcart = JSON.parse(
        localStorage.getItem("carts")
      ).length;
      }else{
           this.cart=[]
           localStorage.removeItem("carts");
           this.products.countcart = 0
      }
    
    },
    async handleorder() {
      await this.order.Order();
      if (!this.order.err) {
        localStorage.removeItem("carts");
        this.cart = [];
        this.products.countcart = 0;
      }
    },
  },
  created() {
    this.order.err = null;
  },
};
</script>

<style  scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -webkit-text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
  text-shadow: rgba(0, 0, 0, 0.01) 0 0 1px;
}
body {
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  font-weight: 400;
  background: #e0e0e0;
  color: #000000;
}
ul {
  list-style: none;
  margin-bottom: 0px;
}
.button {
  display: inline-block;
  background: #0e8ce4;
  border-radius: 5px;
  height: 48px;
  -webkit-transition: all 200ms ease;
  -moz-transition: all 200ms ease;
  -ms-transition: all 200ms ease;
  -o-transition: all 200ms ease;
  transition: all 200ms ease;
}
.button a {
  display: block;
  font-size: 18px;
  font-weight: 400;
  line-height: 48px;
  color: #ffffff;
  padding-left: 35px;
  padding-right: 35px;
}
.button:hover {
  opacity: 0.8;
}
.cart_section {
  width: 100%;
  padding-top: 93px;
  padding-bottom: 111px;
}
.cart_title {
  font-size: 30px;
  font-weight: 500;
}
.cart_items {
  margin-top: 8px;
}
.cart_list {
  border: solid 1px #e8e8e8;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
.cart_item {
  width: 100%;
  padding: 15px;
  padding-right: 46px;
}
.cart_item_image {
  width: 133px;
  height: 133px;
  float: left;
}
.cart_item_image img {
  max-width: 100%;
}
.cart_item_info {
  width: calc(100% - 133px);
  float: left;
  padding-top: 18px;
}
.cart_item_name {
  margin-left: 7.53%;
}
.cart_item_title {
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);
}
.cart_item_text {
  font-size: 15px;
  margin-top: 35px;
  margin-left: 15px;
}
.cart_item_text span {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 11px;
  -webkit-transform: translateY(4px);
  -moz-transform: translateY(4px);
  -ms-transform: translateY(4px);
  -o-transform: translateY(4px);
  transform: translateY(4px);
}
.cart_item_price {
  text-align: right;
}
.cart_item_total {
  text-align: right;
}
.order_total {
  width: 100%;
  height: 60px;
  margin-top: 30px;
  border: solid 1px #e8e8e8;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  padding-right: 46px;
  padding-left: 15px;
  background-color: #fff;
}
.order_total_title {
  display: inline-block;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  line-height: 60px;
}
.order_total_amount {
  display: inline-block;
  font-size: 18px;
  font-weight: 500;
  margin-left: 26px;
  line-height: 60px;
}
.cart_buttons {
  margin-top: 60px;
  text-align: right;
}
.cart_button_clear {
  display: inline-block;
  border: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 48px;
  color: rgba(0, 0, 0, 0.5);
  background: #ffffff;
  border: solid 1px #b2b2b2;
  padding-left: 35px;
  padding-right: 35px;
  outline: none;
  cursor: pointer;
  margin-right: 26px;
}
.cart_button_clear:hover {
  border-color: #0e8ce4;
  color: #0e8ce4;
}
.cart_button_checkout {
  display: inline-block;
  border: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 48px;
  color: #ffffff;
  padding-left: 35px;
  padding-right: 35px;
  outline: none;
  cursor: pointer;
  vertical-align: top;
}
</style>