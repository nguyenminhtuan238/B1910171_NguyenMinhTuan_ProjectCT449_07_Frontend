<template>
   <div class="container my-5">
        <div class="row">
            <div class="col-md-5">
                <div class="main-img">
                     <img
              :src="`http://localhost:5001/api/Imgproducts/` + stoproducts.data.Img"
              class="w-100"
            />
                </div>
            </div>
            <div class="col-md-7">
                <div class="main-description px-2">
                    <div class="product-title text-bold my-3">
                        {{this.stoproducts.data.tilte}}
                    </div>


                    <div class="price-area my-4">
                        <p class="new-price text-bold mb-1">{{price.toLocaleString()}} VND</p>
                    </div>


                    <div class="buttons d-flex my-5">
                        <div class="block quantity">
                            <input type="number" v-model="quancity" class="form-control" id="cart_quantity"  min="1" max="5" placeholder="Enter email" name="cart_quantity">
                        </div>
                        <div class="block">
                            <button class="shadow btn custom-btn"  @click="handlecart()">Thêm Vào Giỏ Hàng</button>
                        </div>

                        
                    </div>
                

                </div>         
            </div>
        </div>
    </div>
</template>

<script>
import { productsStore } from "@/stores/products";
export default {
    setup(){
         const stoproducts = productsStore();
         return{stoproducts}
    },
  data(){
    return{  
        quancity:1,
        price:0
    }
  },
  props:['id'],
  methods:{
      async getproducts(){
         await  this.stoproducts.getoneProduct(this.id)
         this.price= this.stoproducts.data.Price
      },
       async handlecart() {
      await this.stoproducts.addcart(this.id,this.quancity);
    },
  },
  mounted(){
      this.getproducts()
  }

};
</script>

<style  scoped>
  .text-bold {
            font-weight: 800;
        }

        text-color {
            color: #0093c4;
        }

        /* Main image - left */
        .main-img img {
            width: 100%;
        }

        /* Preview images */
        .previews img {
            width: 100%;
            height: 140px;
        }

        .main-description .product-title {
            font-size: 2.5rem;
        }

        .old-price-discount {
            font-weight: 600;
        }

        .new-price {
            font-size: 2rem;
        }

        .details-title {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 1.2rem;
            color: #757575;
        }

        .buttons .block {
            margin-right: 5px;
        }

        .quantity input {
            border-radius: 0;
            height: 40px;

        }


        .custom-btn {
            text-transform: capitalize;
            background-color: #0093c4;
            color: white;
            width: 250px;
            height: 40px;
            border-radius: 0;
        }

        .custom-btn:hover {
            background-color: #0093c4 !important;
            font-size: 18px;
            color: white !important;
        }

    
</style>