import  axios  from "axios";

export class UserService{
    static serverURL = 'http://localhost:5000';

    static getAllUsers(page){
        let dataURL = `${this.serverURL}/users?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersForAdmin(){
        let dataURL = `${this.serverURL}/users/admin/admin`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersByTechnology(id,page){
        let dataURL = `${this.serverURL}/users/technology/${id}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersByDesignation(id,page){
        let dataURL = `${this.serverURL}/users/designation/${id}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getAllUsersByName(searchTerm,page){
        let dataURL = `${this.serverURL}/users/searchTerm/${searchTerm}?page=${page}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static getUser(userId){
        let dataURL = `${this.serverURL}/users/${userId}`;
        return axios.get(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static updateUser(user,userId){
        let dataURL = `${this.serverURL}/users/${userId}`;
        return axios.put(dataURL,user,{headers: {
            'Content-Type': 'application/json'
        }});
    }
    static deleteUser(userId){
        let dataURL = `${this.serverURL}/users/${userId}`;
        return axios.delete(dataURL,{headers: {
            'Content-Type': 'application/json'
        }});
    }
}