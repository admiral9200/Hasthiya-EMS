import  axios  from "axios";
import store from "../store/index";


axios.interceptors.request.use(req => {
        let accessToken = store.getters.getUserState.token;
        req.headers.Authorization = `Bearer ${accessToken}`;
    console.log('INTERCEPTED');
    return req;
},
(error) => {
  return Promise.reject(error);
});

export class AssetsTypeService{
    static serverURL = 'http://localhost:8000';

   
    static getAll(){
        let dataURL = `${this.serverURL}/assetsTypes`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getById(id){
        let dataURL = `${this.serverURL}/assetsTypes/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static create(data){
        let dataURL = `${this.serverURL}/assetsTypes/`;
        return axios.post(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static update(data,id){
        let dataURL = `${this.serverURL}/assetsTypes/${id}`;
        return axios.put(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static delete(id){
        let dataURL = `${this.serverURL}/assetsTypes/${id}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}