import axios from "axios";

export class AuthService{
    static serverURL = 'http://localhost:5000';

    
    static getUserDetails(data){
        let dataURL = `${this.serverURL}/auth/details`;
        return axios.post(dataURL,data);
    }
    static login(data){
        let dataURL = `${this.serverURL}/auth/login`;
        return axios.post(dataURL,data);
    }
    static signup(data){
        let dataURL = `${this.serverURL}/auth/signup`;
        return axios.post(dataURL,data);
    }
   
}