
import BrandModel from "../model/BrandModel.js";
import CampaignModel from "../model/CampaignModel.js";

export const signUpBrand = async (request, response) => {
    try{
        let exist = await BrandModel.findOne({brandName: request.body.brandName})
        if(exist){
            response.status(200).json({msg: "This Brand has already an account"});
            return;
        }
        const newUser = new BrandModel(request.body);
        await newUser.save();
        return response.status(200).json(newUser)
    }catch(e){
        return response.status(500).json(e)
    }
}
export const loginBrand = async (request, response) => {
    try{
        let exist = await BrandModel.findOne({email: request.query.email, password: request.query.password})
        if(exist){
            response.status(200).json(exist);
            return;
        }
        response.status(200).json({msg:'Login credentials are incorrect'});
    }catch(e){
        return response.status(500).json(e)
    }
}

export const createCampaign = async(request, response) => {
    try{
        const newCampaign = new CampaignModel(request.body);
        await newCampaign.save();
        return response.status(200).json(newCampaign)
    }catch(e){
        return response.status(500).json(e)
    }
}

export const  getActiveCampaign = async(request, response) => {
    try{
        let result = await CampaignModel.find({createdBy: request.query.brandId, status:true})
        return response.status(200).json(result)
    }catch(e){
        return response.status(500).json(e)
    }
}

export const  getFailedCampaign = async(request, response) => {
    try{
        let result = await CampaignModel.find({createdBy: request.query.brandId, status:false})
        return response.status(200).json(result)
    }catch(e){
        return response.status(500).json(e)
    }
}




