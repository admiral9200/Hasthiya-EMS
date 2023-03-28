import  axios  from "axios";
import store from "../store/index";
import {serverURL} from "../constants/Constants";

axios.interceptors.request.use(req => {
        let accessToken = store.getters.getUserState.token;
        req.headers.Authorization = `Bearer ${accessToken}`;
    console.log('INTERCEPTED');
    return req;
},
(error) => {
  return Promise.reject(error);
});

export class AssetsService{

   
    static getAll(page){
        let dataURL = `${serverURL}/assets?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getById(id){
        let dataURL = `${serverURL}/assets/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getByAssignPerson(id){
        let dataURL = `${serverURL}/assets/user/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getByType(id){
        let dataURL = `${serverURL}/assets/type/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static create(data){
        let dataURL = `${serverURL}/assets/`;
        return axios.post(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static update(data,id){
        let dataURL = `${serverURL}/assets/${id}`;
        return axios.put(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static delete(id){
        let dataURL = `${serverURL}/assets/${id}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}