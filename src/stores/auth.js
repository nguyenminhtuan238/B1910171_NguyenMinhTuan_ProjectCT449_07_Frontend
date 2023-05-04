import { defineStore } from "pinia";
import AuthService from "../services/Auth.service";
export const Authstore = defineStore("authstore", {
    state: () => ({
        user: null,
        admin:null,
        err: null
    }),
    actions: {
        async getuser() {
            if (localStorage.getItem("User")) {
                const res = await AuthService.getuser(localStorage.getItem("User"))
                this.user = res.finduser

            }
            if(localStorage.getItem("admin")){
                const res = await AuthService.getuser(localStorage.getItem("admin"))
                this.admin = res.finduser
            }
        },
        async Register(data) {
            try {
                const res = await AuthService.Register(data)
                localStorage.setItem("User", res.acctoken)
                window.location.reload()
            } catch (error) {
                switch (error.response?.status) {
                    case 403:
                        this.err = " username Đã Tồn tại "
                        console.log(this.err)
                        break;
                    case 405:
                        this.err = "Không Được Để trống "
                        console.log(this.err)
                        break;
                    case 500:
                        this.err = "Lỗi Server"
                        break;
                }
                console.log(error)
            }
        },
        async Login(data) {
            try {
                const res = await AuthService.Login(data)
                localStorage.setItem("User", res.acctoken) 
                window.location.reload()
            } catch (error) {

                switch (error.response?.status) {
                    case 403:
                        this.err = "Mật Khẩu và username không đúng "
                        console.log(this.err)
                        break;
                    case 405:
                        this.err = "Không Được Để trống "
                        console.log(this.err)
                        break;
                    case 500:
                        this.err = "Lỗi Server"
                        break;
                }
                console.log(error)
            }
        },
        async updateIFM(data) {
           try {
              const res= await AuthService.updateifm(localStorage.getItem("User"),data)
               this.user=res.finduser
           } catch (error) {
            console.log(error)
           }
        },
        async adminLogin(data) {
            try {
                const res = await AuthService.Login(data)
                const testadmin=await AuthService.getuser(res.acctoken)
                if(testadmin.finduser.role==true){
                    localStorage.setItem("admin", res.acctoken)
                    window.location.reload()
                }else{
                    this.err = "Mật Khẩu và username không đúng "
                }
            } catch (error) {

                switch (error.response?.status) {
                    case 403:
                        this.err = "Mật Khẩu và username không đúng "
                        console.log(this.err)
                        break;
                    case 405:
                        this.err = "Không Được Để trống "
                        console.log(this.err)
                        break;
                    case 500:
                        this.err = "Lỗi Server"
                        break;
                }
                console.log(error)
            }
        },
    },
})