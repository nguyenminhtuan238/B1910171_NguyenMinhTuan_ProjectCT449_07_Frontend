import createApiClient from "./api.service";
class OrderService{
    constructor(baseURL = '/api/order'){
        this.api=createApiClient(baseURL)
    }
    async create(auth,data) { 
        return (await this.api.post("/",data,{ 
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth}`
            }, 
        })).data; 
    }
    async findDH() { 
        return (await this.api.get("/")).data; 
    }
    async findUserDH(auth) { 
        return (await this.api.get("/DH/find",{
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth}`
            }, 
        })).data; 
    }
    async findUserHD(auth) { 
        return (await this.api.get("/HD/findHD/",{
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${auth}`
            }, 
        })).data; 
    }
    async CheckDH(id) { 
        return (await this.api.put("/"+id)).data; 
    }
}
export default new OrderService