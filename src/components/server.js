import { createServer ,Model,models} from "miragejs"
import { Route } from "react-router-dom"

export default function () {
  createServer({
    models:{
        users:Model,
        compaign:Model
    },


    routes(){
      this.namespace = '/api';
        this.post('/auth/',(schema,request)=>{
            
       });
       this.get('/dashboard',(schema)=>{
        
    });
    }
  })
}