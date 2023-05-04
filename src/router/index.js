import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/user/home.vue";
import AuthLogin from "@/components/user/auth/Auth.login.vue"
import AuthRegister from "@/components/user/auth/Auth.register.vue"
import Cart from "@/components/user/cart/cart.vue"
import products from "@/components//user/products/products.vue"
import Search from "@/components//user/search.vue"
import detail from "@/components//user/products/detail.vue"
import IFM from "@/components//user/ifm.vue"
import Dh from "@/components//user/DH/DH.vue"
import Hd from "@/components//user/HD/HD.vue"
import Addproduct from "@/components/admin/handleproducts/formproducts.vue"
import updateproduct from "@/components/admin/handleproducts/updateproduct.vue"
import homeadmin from "@/components/admin/homeadmin.vue"
import authadmin from "@/components/admin/auth.vue"
import order from "@/components/admin/handleorder/order.vue"
import vieworder from "@/components/admin/handleorder/view.vue"
const routes=[
    { path: '/', 
    name:"Home",
    component: Home,
    children:[
        { path: '', name:"products",component: products },
        { path: 'cart', name:"cart",component: Cart },
        { path: 'search/:id', name:"Search",component: Search,props:true},
        { path: 'detail/:id', name:"detail",component: detail,props:true},
        { path: 'Login', name:"login",component: AuthLogin,beforeEnter:(to,from)=>{
            if(localStorage.getItem("User")){
                return router.push('/')
            }}
        },
        { path: 'Register', name:"Register",component: AuthRegister,beforeEnter:(to,from)=>{
            if(localStorage.getItem("User")){
                return router.push('/')
            }}
        },
        { path: 'ThongTin', name:"IFM",component: IFM,beforeEnter:(to,from)=>{
            if(!localStorage.getItem("User")){
                return router.push('/')
            }}
        },
        { path: 'DH', name:"DH",component: Dh,beforeEnter:(to,from)=>{
            if(!localStorage.getItem("User")){
                return router.push('/')
            }}
        },
        { path: 'HD', name:"HD",component: Hd,beforeEnter:(to,from)=>{
            if(!localStorage.getItem("User")){
                return router.push('/')
            }}
        },
    ]
    },
    { path: '/admin', 
    name:"admin",
    component: homeadmin,
    children:[
        {path:"",name:"loginadmin",component:authadmin,beforeEnter:(to,from)=>{
            if(localStorage.getItem("admin")){
                return router.push('admin/products')
            }}
        },
        {path:"products",name:"Addproduct",component:Addproduct,beforeEnter:(to,from)=>{
            if(!localStorage.getItem("admin")){
                return router.push('admin')
            }}
        },
        {path:"updateproducts/:id", name:"updateproducts",component:updateproduct,props:true,beforeEnter:(to,from)=>{
            if(!localStorage.getItem("admin")){
                return router.push('admin')
            }}
        },
        {path:"order",name:"order",component:order,beforeEnter:(to,from)=>{
            if(!localStorage.getItem("admin")){
                return router.push('admin/products')
            }}
        },
        {path:"order/:id",name:"vieworder",component:vieworder,props:true,beforeEnter:(to,from)=>{
            if(!localStorage.getItem("admin")){
                return router.push('admin/products')
            }}
        },
    ]
    },
    { path: "/:pathMatch(.*)*", 
    name: "notfound", 
    component: () => import("@/components/NotFound.vue"), 
    },
]
const router=createRouter({
    history:createWebHistory(import.meta.BASE_URL),
    routes,
})

export default router