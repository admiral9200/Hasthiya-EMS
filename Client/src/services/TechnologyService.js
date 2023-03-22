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

export class TechnologyService{
    static serverURL = 'http://localhost:5000';

   
    static getAllTechnologies(){
        let dataURL = `${this.serverURL}/technology`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getTechnologyById(id){
        let dataURL = `${this.serverURL}/technology/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static createTechnology(data){
        let dataURL = `${this.serverURL}/technology/`;
        return axios.post(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static updateTechnology(data,id){
        let dataURL = `${this.serverURL}/technology/${id}`;
        return axios.put(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static deleteTechnology(id){
        let dataURL = `${this.serverURL}/technology/${id}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}