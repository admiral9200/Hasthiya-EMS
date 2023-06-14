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

export class SalaryService{

   
    static getAll(page){
        let dataURL = `${serverURL}/salary?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getById(id){
        let dataURL = `${serverURL}/salary/${id}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getByAssignPerson(data){
        let dataURL = `${serverURL}/salary/user/${data.id}?page=${data.page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getByDate(data){
        let dataURL = `${serverURL}/salary/date/${data.date}?page=${data.page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static create(data){
        let dataURL = `${serverURL}/salary/`;
        return axios.post(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static update(data,id){
        let dataURL = `${serverURL}/salary/${id}`;
        return axios.put(dataURL,data,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static delete(id){
        let dataURL = `${serverURL}/salary/${id}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}