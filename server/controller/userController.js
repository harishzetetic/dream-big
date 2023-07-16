
import UserModel from "../model/UserModel.js"
import { states } from "../Constants.js";
export const addUser = async (request, response) => {
    try{
        let exist = await UserModel.findOne({sub: request.body.sub})
        if(exist){
            response.status(200).json({msg: "user already exist"});
            return;
        }
        const newUser = new UserModel(request.body);
        await newUser.save();
        return response.status(200).json(newUser)
    }catch(e){
        return response.status(500).json(e)
    }
}

export const getState = async (request, response) => {
    try{
        return response.status(200).json(states)
    }catch(e){
        return response.status(500).json(e)
    }
}

