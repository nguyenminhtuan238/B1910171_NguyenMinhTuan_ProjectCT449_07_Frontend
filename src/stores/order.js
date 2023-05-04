import { defineStore } from "pinia";
import OrderService from "../services/order.service";
import CartService from "../services/cartdt.service";
import AuthService from "../services/Auth.service";
import productsService from "@/services/products.service";
import Swal from "sweetalert2";
export const orderstore = defineStore("orderstore", {
    state: () => ({
        err: null,
        DH:[],
        dt:[],
    }),
    actions: {
        
        async Order() {
            try {
                if(localStorage.getItem("User") && localStorage.getItem("carts")){
                      const cart=JSON.parse(localStorage.getItem("carts"))
                     const user= await AuthService.getuser(localStorage.getItem("User"))
                      const data={
                          total:cart.reduce((a,b)=>a+b.Price*b.quancity,0),
                          Name:user.finduser.Name,
                          Phone:user.finduser.Phone,
                          Address:user.finduser.Address
                      }
                      const order=await OrderService.create(localStorage.getItem("User"),data)
                      cart.map( async item=>{
                          const p= {
                              id_pd:item._id,
                              id_or:order.createorder._id,
                              quancity:item.quancity
                          }
                         const res= await CartService.create(p)
                      })
                }else{
                    this.err=!localStorage.getItem("User")?"Chưa Đăng Nhập":"Giỏ Hàng Rỗng"
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getDH() {
            try {
               const res=await OrderService.findDH()
               this.DH=res.Order
            } catch (error) {
                console.log(error)
            }
        },
        async getUserDH() {
            try {
               const res=await OrderService.findUserDH(localStorage.getItem("User"))
               this.DH=res.Order
            } catch (error) {
                console.log(error)
            }
        },
        async getUserHD() {
            try {
               const res=await OrderService.findUserHD(localStorage.getItem("User"))
               this.DH=res.Order
            } catch (error) {
                console.log(error)
            }
        },
        async Check(id) {
            try {
                const resdt=await CartService.findorder(id)
                let lp=[]
                let o=true
            for(var  i=0; i<resdt.Cartdt.length;i++){
                const pd=await productsService.get(resdt.Cartdt[i].ID_pd) 
                    lp.push({...pd.findproducts,upKho:pd.findproducts.Kho-resdt.Cartdt[i].quancity})
                if(pd.findproducts.Kho-resdt.Cartdt[i].quancity<0){
                    o=false   
                }
            }
            if(o){  
                for(const item in lp){
                    await productsService.updateKho(lp[item]._id,lp[item].upKho)    
                }
                    const res=await OrderService.CheckDH(id)
                   this.DH=res.Order
            }else{
                      const alert="Sản Phẩm  trong Kho Không đủ vui lòng nhập thêm"
                    Swal.fire({
                        icon: 'error',
                        title: 'Thất bại',
                        text: alert,
    
                    })
            }
            } catch (error) {
                console.log(error)
            }
        },
        async findcart(id){
            try {
                const res=await CartService.findorder(id)
                var po=[]
                for(const item in res.Cartdt){
                        const pd=await productsService.get(res.Cartdt[item].ID_pd)       
                         po.push({...pd.findproducts,quancity:res.Cartdt[item].quancity})
                }
                this.dt=po
             } catch (error) {
                 console.log(error)
             }
        }
    },
})