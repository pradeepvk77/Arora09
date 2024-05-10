import {Client , Databases} from "appwrite"
import { conf } from "../conf/conf";

class DatabaseCollection{
    client = new Client();
    database;
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_endpoint)
        .setProject(conf.appwrite_project_id)
        this.database = new Databases(this.client);
    }
    async pushData(post,imageId){
        try{
            let response = await this.database.createDocument(conf.appwrite_database_id,conf.appwrite_collection_id,imageId,post)
        }catch(error){
            console.log("appwrite error :: push data in database",error);
            throw error;
        }
    }
    async getDataById(postid){
        try{
            let response = await this.database.getDocument(conf.appwrite_database_id,conf.appwrite_collection_id,postid);
            return response;
        }catch(error){
            console.log("appwrite error :: get data in database",error);
            throw error;
        }
    }
    async getData(){ //allpost download in single function
        try{
            let response = await this.database.listDocuments(conf.appwrite_database_id,conf.appwrite_collection_id)
            return response.documents;
        }catch(error){
            console.log("appwrite error :: get all data in database",error);
            throw error;
        }
    }
    async deletePostData(postId){
        try{
            const response = await this.database.deleteDocument(conf.appwrite_database_id,conf.appwrite_collection_id,postId)
            return response;
        }catch(e){
            console.log("appwrite database error :: delete Data error "+e.message)
        }
    }
    async upadatePostData(post, postId){
        try{
            const response = await this.database.updateDocument(conf.appwrite_database_id,conf.appwrite_collection_id,postId, post);
            return response            
        }catch(e){
            console.log("appwrite database error :: upadate Data error "+e.message)
        }
    }
}

const databaseCollection = new DatabaseCollection();
export default databaseCollection;