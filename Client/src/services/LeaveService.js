import  axios  from "axios";
import {serverURL} from "../constants/Constants";

axios.interceptors.request.use(req => {
        let accessToken = localStorage.getItem('token')
        req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
},
(error) => {
  return Promise.reject(error);
});

export class LeaveService{

   
    static getAll(){
        let dataURL = `${serverURL}/leaves`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllByReportPerson(id,page){
        let dataURL = `${serverURL}/leaves/reportPerson/${id}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllByEmployee(id,page){
        let dataURL = `${serverURL}/leaves/user/${id}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getById(id){
        let dataURL = `${serverURL}/leaves/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static create(data){
        let dataURL = `${serverURL}/leaves/`;
        return axios.post(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static update(data,id){
        let dataURL = `${serverURL}/leaves/${id}`;
        return axios.put(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static delete(id){
        let dataURL = `${serverURL}/leaves/${id}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}