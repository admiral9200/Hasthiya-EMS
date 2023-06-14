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

export class UserService{

    static getAllUsers(page){
        let dataURL = `${serverURL}/users?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersForAdmin(){
        let dataURL = `${serverURL}/users/admin/admin`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersByTechnology(id,page){
        let dataURL = `${serverURL}/users/technology/${id}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersByDesignation(id,page){
        let dataURL = `${serverURL}/users/designation/${id}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersByName(searchTerm,page){
        let dataURL = `${serverURL}/users/searchTerm/${searchTerm}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getUser(userId){
        let dataURL = `${serverURL}/users/${userId}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static updateUser(user,userId){
        let dataURL = `${serverURL}/users/${userId}`;
        return axios.put(dataURL,user,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static updateUserPassword(user,userId){
        let dataURL = `${serverURL}/users/password/${userId}`;
        return axios.put(dataURL,user,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static deleteUser(userId){
        let dataURL = `${serverURL}/users/${userId}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}