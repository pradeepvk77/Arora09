import {Account, Client , ID} from 'appwrite'
import { conf } from '../conf/conf';

class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_endpoint)
        .setProject(conf.appwrite_project_id);
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try{
            await this.account.create(ID.unique(),email,password,name);
            return this.login({email,password});
        }catch(error){
            console.log("appwrite error :: create account",error);
            throw error;
        }
    }
    async login({email,password}){
        console.log(email,password);
        
        try{                          
            return await this.account.createEmailPasswordSession(email,password);
        }catch(error){
            console.log("appwrite error :: login account",error);
            throw error;
        }
    }
    
    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch(error){
            console.log("appwrite error :: get user",error);
            return null
        }
    }
    async logout(id){
        try{
            return await this.account.deleteSessions(id);
            
        }catch(error){
            console.log("appwrite error :: logout user",error);
            throw error;
        }
    }
}
const authService = new AuthService();
export default authService;
