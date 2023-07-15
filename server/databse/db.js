import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const Connection = async () =>{
    const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-cxa02he-shard-00-00.1b6s6yt.mongodb.net:27017,ac-cxa02he-shard-00-01.1b6s6yt.mongodb.net:27017,ac-cxa02he-shard-00-02.1b6s6yt.mongodb.net:27017/?ssl=true&replicaSet=atlas-ko25ej-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, {useUnifiedTopology: true});
        console.log('Databse connected successfully');
    }catch(e){
        console.log('Error in connected Databse', e)
    }
}

export default Connection