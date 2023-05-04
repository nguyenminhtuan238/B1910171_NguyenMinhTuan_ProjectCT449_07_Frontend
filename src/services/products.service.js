import createApiClient from "./api.service";
class ProductsService{
    constructor(baseUrl="/api/products"){
        this.api=createApiClient(baseUrl)
    }
    async getAll(page) { 
        if(page){
            return (await this.api.get("?page="+page)).data; 
        }else{
            return (await this.api.get("/")).data; 
        }
       
    }
    async get(id) { 
        return (await this.api.get(`/${id}`)).data; 
    }
    async create(data) { 
        return (await this.api.post("/", data)); 
    }
    async update(id,data) { 
        return (await this.api.put("/"+id, data)).data; 
    }
    async updateKho(id,Kho) { 
        return (await this.api.put("/Kho/"+id, {Kho:Kho},{
            headers: { 
                "Content-Type": "application/json", 
            }, 
        })).data; 
    }
    async search(id) { 
        return (await this.api.get("/search/"+id)).data; 
    }
    async deleteOne(id) { 
        return (await this.api.delete("/"+id)).data; 
    }
}
export default new ProductsService