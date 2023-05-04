import createApiClient from "./api.service";
class CartdtService{
    constructor(baseURL = '/api/cartdt/'){
        this.api=createApiClient(baseURL)
    }
    async create(data) { 
        return (await this.api.post("/", data,{
            headers: { 
                "Content-Type": "application/json"
            }
        })).data; 
    }
    async findorder(id) { 
        return (await this.api.get("/"+id)).data; 
    }
}
export default new CartdtService