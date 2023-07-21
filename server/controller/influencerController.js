
import InfluencerModel from "../model/InfluencerModel.js"
import CampaignModel from "../model/CampaignModel.js";
import _ from 'lodash'
import PostModel from "../model/PostModel.js";

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

export const  getAllActiveCampaign = async(request, response) => {
    try{
        let result = await CampaignModel.find({status:true})
        return response.status(200).json(result)
    }catch(e){
        return response.status(500).json(e)
    }
}

export const  likeDislike= async(request, response) => {
   
    try{
        let targetCampaign = await CampaignModel.findOne({_id:request.body.campaignId})
        if(targetCampaign){
            if(request.body.vote === 'like'){
                const updatedLikesObj = _.cloneDeep(targetCampaign.likes);
                const index = updatedLikesObj.find(item => item.id === request.body.userId)
                if(index){
                    _.remove(updatedLikesObj, {id: request.body.userId});
                } else{
                    updatedLikesObj.push({id: request.body.userId, name: request.body.userName})
                }
                targetCampaign.likes = updatedLikesObj
                await CampaignModel.updateOne({ _id: request.body.campaignId }, { $set: targetCampaign })
                return response.status(200).json(targetCampaign)
            }  else if(request.body.vote === 'dislike'){
                const updatedDisLikesObj = _.cloneDeep(targetCampaign.dislikes);
                const index = updatedDisLikesObj.find(item => item.id === request.body.userId)
                if(index){
                    _.remove(updatedDisLikesObj, {id: request.body.userId});
                } else{
                    updatedDisLikesObj.push({id: request.body.userId, name: request.body.userName})
                }
                targetCampaign.dislikes = updatedDisLikesObj
                await CampaignModel.updateOne({ _id: request.body.campaignId }, { $set: targetCampaign })
                return response.status(200).json(targetCampaign)
            }
           
        }
    }catch(e){
        return response.status(500).json(e)
    }


}


export const joinCampaign = async (req, res) =>{
    try{
        const { joinerId, joinerName, campaignId, campaignTitle } = req.body
        const influencer = await InfluencerModel.findOne({_id:joinerId})
        const campaign = await CampaignModel.findOne({_id:campaignId})

        if(influencer && campaign){
            const subscribedCampaigns = _.cloneDeep(influencer.subscribedCampaigns);
            subscribedCampaigns.push({campaignId, campaignTitle})
            influencer.subscribedCampaigns = subscribedCampaigns;
            await InfluencerModel.updateOne({ _id: joinerId }, { $set: influencer })


            const campaignSubscribers = _.cloneDeep(campaign.subscribers);
            campaignSubscribers.push({joinerId, joinerName})
            campaign.subscribers = campaignSubscribers;
            await CampaignModel.updateOne({ _id: campaignId }, { $set: campaign })
            return res.status(200).json(campaign)
            }
    }catch(e){
        return res.status(500).json(e)
    }
}

export const leaveCampaign = async (req, res) =>{
    try{
        const { joinerId, joinerName, campaignId, campaignTitle } = req.body
        const influencer = await InfluencerModel.findOne({_id:joinerId})
        const campaign = await CampaignModel.findOne({_id:campaignId})

        if(influencer && campaign){
            const subscribedCampaigns = _.cloneDeep(influencer.subscribedCampaigns);
            const filteredSubscribedCampaign = subscribedCampaigns.filter(item => item.campaignId !== campaignId)
            // subscribedCampaigns.push({campaignId, campaignTitle})
            influencer.subscribedCampaigns = filteredSubscribedCampaign;
            await InfluencerModel.updateOne({ _id: joinerId }, { $set: influencer })


            const campaignSubscribers = _.cloneDeep(campaign.subscribers);
            const filteredSubscribers = campaignSubscribers.filter(item => item.joinerId!==joinerId)
           // campaignSubscribers.push({joinerId, joinerName})
            campaign.subscribers = filteredSubscribers;
            await CampaignModel.updateOne({ _id: campaignId }, { $set: campaign })

            return res.status(200).json(campaign)
            }
    }catch(e){
        return res.status(500).json(e)
    }
}

export const getInfluencerAssignedCampaign = async (req, res) => {
    try{
        const {influencerId} = req.query;
        const influencer = await InfluencerModel.findOne({_id:influencerId})
        if(influencer){
            return res.status(200).json(influencer)
        }

    } catch(e){
        return res.status(500).json(e)
    }
}

export const newBlogPost = async(req, res)=>{
    try{
        const newPost = new PostModel(req.body);
        await newPost.save();
        return res.status(200).json(newPost)

    }catch(e){
        return res.status(500).json(e)
    }
}

export const fetchAllPostForInfluencer = async(req, res)=>{
    try{
        let allPosts = await PostModel.find({creatorID: req.query.influencerId})
        return res.status(200).json(allPosts)

    }catch(e){
        return res.status(500).json(e)
    }
}

export const getSingleCampaignById = async(req,res)=>{
    try{
        let campaign = await CampaignModel.findOne({_id: req.query.campaignId})
        return res.status(200).json(campaign)

    }catch(e){
        return res.status(500).json(e)
    }
}

export const getInfluencerById = async(req, res)=>{
    try{
        const influencer = await InfluencerModel.findOne({_id: req.query.influencerId})
        return res.status(200).json(influencer)
    }catch(e){
        return res.status(500).json(e)
    }
}

export const getTopInfluencers = async(req, res) => {
    try{
        const allInfluencers = await InfluencerModel.find();
        return res.status(200).json(allInfluencers)
    }catch(e){
        return res.status(500).json(e)
    }
}