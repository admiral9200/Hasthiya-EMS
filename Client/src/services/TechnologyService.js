import  axios  from "axios";
import store from "../store/index";
import {serverURL} from "../constants/Constants";

axios.interceptors.request.use(req => {
        let accessToken = store.getters.getUserState.token;
        req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
},
(error) => {
  return Promise.reject(error);
});

export class TechnologyService{

   
    static getAll(){
        let dataURL = `${serverURL}/technology`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getById(id){
        let dataURL = `${serverURL}/technology/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static create(data){
        let dataURL = `${serverURL}/technology/`;
        return axios.post(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static update(data,id){
        let dataURL = `${serverURL}/technology/${id}`;
        return axios.put(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static delete(id){
        let dataURL = `${serverURL}/technology/${id}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}