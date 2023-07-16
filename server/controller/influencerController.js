
import InfluencerModel from "../model/InfluencerModel.js"


export const signUpInfluencer = async (request, response) => {
    try{
        let exist = await InfluencerModel.findOne({email: request.body.email})
        if(exist){
            response.status(200).json({msg: "influencer already exist"});
            return;
        }
        const newUser = new InfluencerModel(request.body);
        await newUser.save();
        return response.status(200).json(newUser)
    }catch(e){
        return response.status(500).json(e)
    }
}

export const loginInfluencer = async (request, response) => {
    try{
        let exist = await InfluencerModel.findOne({email: request.query.email, password: request.query.password})
        if(exist){
            response.status(200).json(exist);
            return;
        }
        response.status(200).json({msg:'Login credentials are incorrect'});
    }catch(e){
        return response.status(500).json(e)
    }
}
