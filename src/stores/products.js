import { defineStore } from "pinia";
import productsService from "@/services/products.service";
import Swal from "sweetalert2";
export const productsStore = defineStore('productsStore', {
  state: () => ({
    data: [],
    loading: "",
    cart: [],
    pd: [],
    page: 1,
    getpage:1,
    countcart:localStorage.getItem("carts")? JSON.parse(localStorage.getItem("carts")).length:0,
    err: null
  }),
  actions: {
    async getoneProduct(id) {
      try {
        const res = await productsService.get(id);
        this.data = res.findproducts
      } catch (error) {
        console.log(error)
      }
    },
    async search(id) {
      try {
        const res = await productsService.search(id);
        this.pd = res.findproducts
      } catch (error) {
        console.log(error)
      }
    },
    async getProducts() {
      try {

        this.loading = true
        const res = await productsService.getAll();
        this.page = Math.ceil(res.findproducts.length / 6)
        this.loading = false


      } catch (error) {
        console.log(error)
      }
    },
    async getPageProducts(page) {
      try {
        if (page) {
          this.loading = true
          const res = await productsService.getAll(page);
          this.data = res.findproducts
          this.loading = false

        } else {

          this.loading = true
          const res = await productsService.getAll();
          this.data = res.findproducts
          this.loading = false
        }

      } catch (error) {
        console.log(error)
      }
    },
    async addcart(id,a) {
      try {
        const sl=a?a:1
        const res = await productsService.get(id);
        const cart = JSON.parse(localStorage.getItem("carts"))
        if (cart) {
          if (cart.find(e => e._id === id)) {
            cart.map((item, index) => {
              if (item._id === id) {
                const p = {
                  ...item,
                  quancity: item.quancity + sl
                }
                cart[index] = p
                localStorage.setItem("carts", JSON.stringify(cart))
              }
            })
          } else {

            const p = {
              ...res.findproducts,
              quancity: sl
            }
            cart.push(p)
            localStorage.setItem("carts", JSON.stringify(cart))
          }
        } else {
          this.cart = []
          const p = {
            ...res.findproducts,
            quancity: sl
          }
          this.cart.push(p)
          localStorage.setItem("carts", JSON.stringify(this.cart))
        }

      } catch (error) {
        console.log(error)
      }
      this.countcart = JSON.parse(localStorage.getItem("carts")).length
    },
    async addproducts(data) {
      try {
        this.loading = true
        const res = await productsService.create(data)

        Swal.fire({
          title: 'Thêm thành công',
          icon: 'success'
        }).then(resl => {
          if (resl.isConfirmed) {
            this.data = res.data.findproducts
            this.loading = false
          }
        })



      } catch (error) {
        Swal.fire({
          title: 'Thêm thất bại',
          icon: 'error'
        })
        if (error.response.status === 405) {
          this.err = "Lỗi File"
        }
        if (error.response.status === 401) {
          this.err = "Tên Video đã Tồn tại"
        }
        if (error.response.status === 402) {
          this.err = "File Rỗng"
        }
        console.log(error)
        this.loading = false
      }
    },
    async updateproducts(id, data) {
      try {
        this.loading = false
        await productsService.update(id, data)
        this.loading = true
      } catch (error) {
        Swal.fire({
          title: 'Thêm thất bại',
          icon: 'error'
        })
        if (error.response.status === 405) {
          this.err = "Lỗi File"
        }
        if (error.response.status === 401) {
          this.err = "Tên Video đã Tồn tại"
        }
        if (error.response.status === 402) {
          this.err = "File Rỗng"
        }
        console.log(error)
        this.loading = false
      }
    },
    async deleteproducts(id) {
      try {
        this.loading = true
        const res = await productsService.deleteOne(id)
        this.data = res.findproducts
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    },
  }

})
