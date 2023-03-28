import axios from "axios";
import {serverURL} from "../constants/Constants";
export class AuthService{

    
    static getUserDetails(data){
        let dataURL = `${serverURL}/auth/details`;
        return axios.post(dataURL,data);
    }
    static login(data){
        let dataURL = `${serverURL}/auth/login`;
        return axios.post(dataURL,data);
    }
    static signup(data){
        let dataURL = `${serverURL}/auth/signup`;
        return axios.post(dataURL,data);
    }
   
}