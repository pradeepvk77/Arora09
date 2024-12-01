import { Client, Storage} from "appwrite";
import { conf } from "../conf/conf";

class BucketCollection{
    client = new Client();
    storage;
    constructor(){
        this.client
        .setEndpoint(conf.appwrite_endpoint)
        .setProject(conf.appwrite_project_id)
        this.storage = new Storage(this.client);
    }
    async putPostImage(postImg,id){
        try{
            const response = await this.storage.createFile(conf.appwrite_bucket_id,id,postImg);
            return response.$id;
        } catch(e){
            console.log("Appwrite Bucket error :: error putPostImage"+e.message);
        }
    }
    async getImagePrev(imageId){
        try{
            const response = this.storage.getFilePreview(conf.appwrite_bucket_id,imageId);
            return response.href;
        } catch(e){
            console.log("Appwrite Bucket error :: error get Image prev "+e.message);
        }
    }
    async deleteImage(imageId){
        try{
            const response = this.storage.deleteFile(conf.appwrite_bucket_id,imageId);
            return response;
        } catch(e){
            console.log("Appwrite Bucket error :: error delete Image "+e.message);
        }
    }
    async updateImage(imageId,image){
        try{
            await this.deleteImage(imageId);
            return await this.putPostImage(image,imageId)
        } catch(e){
            console.log("Appwrite Bucket error :: error update Image "+e.message);
        }
    }
}
const bucketCollection = new BucketCollection();
export default bucketCollection;

