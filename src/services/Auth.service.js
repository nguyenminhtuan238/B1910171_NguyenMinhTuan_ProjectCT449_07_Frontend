import createApiClient from "./api.service";
class AuthService{
    constructor(baseURL="/api/auth"){
        this.api=createApiClient(baseURL)
    }
    async Register(data){
        return (await this.api.post("/Register",data,{ 
            headers: { 
                "Content-Type": "application/json", 
            }, 
        })).data; 
    }
    async Login(data){
        return (await this.api.post("/Login",data,{ 
            headers: { 
                "Content-Type": "application/json", 
            }, 
        })).data; 
    }
    async getuser(auth){
        return (await this.api.get("/",{ 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth}`
            }, 
        })).data; 
    }
    async updateifm(auth,data){
        return (await this.api.put("/",data,{ 
            headers: { 
                "Content-Type": "multipart/form-data", 
                Accept: "multipart/form-data", 
                "Authorization": `Bearer ${auth}`
               
            }, 
        })).data; 
    }
}
export default new AuthService