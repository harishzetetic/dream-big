
import UserModel from "../model/UserModel.js"
import { states } from "../Constants.js";
import PostModel from "../model/PostModel.js";
import _ from 'lodash'
import StaticsModel from "../model/StaticsModel.js";
import InfluencerModel from "../model/InfluencerModel.js";
import CampaignModel from "../model/CampaignModel.js";

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

export const fetchAllPostForUser = async (req, res) => {
    try{    
        const allPosts = await PostModel.find();
        return res.status(200).json(allPosts)
    }catch(e){
        return res.status(500).json(e)
    }
}


export const  likePost= async(request, response) => {

    try{
        let targetPost = await PostModel.findOne({_id:request.body.postId})
        if(targetPost){
                const updatedLikesObj = _.cloneDeep(targetPost.likes);
                const index = updatedLikesObj.find(item => item.id === request.body.userID)
                if(index){
                    _.remove(updatedLikesObj, {id: request.body.userID});
                } else{
                    updatedLikesObj.push({id: request.body.userID, name: request.body.userName})
                }
                
                targetPost.likes = updatedLikesObj
                await PostModel.updateOne({ _id: request.body.postId }, { $set: targetPost })
                return response.status(200).json(targetPost)
           
        }
    }catch(e){
        return response.status(500).json(e)
    }


}


export const  disLikePost= async(request, response) => {

    try{
        let targetPost = await PostModel.findOne({_id:request.body.postId})
        if(targetPost){
                const updatedDisLikesObj = _.cloneDeep(targetPost.dislikes);
                const index = updatedDisLikesObj.find(item => item.id === request.body.userID)
                if(index){
                    _.remove(updatedDisLikesObj, {id: request.body.userID});
                } else{
                    updatedDisLikesObj.push({id: request.body.userID, name: request.body.userName})
                }
                
                targetPost.dislikes = updatedDisLikesObj
                await PostModel.updateOne({ _id: request.body.postId }, { $set: targetPost })
                return response.status(200).json(targetPost)
           
        }
    }catch(e){
        return response.status(500).json(e)
    }


}


export const  postComment= async(request, response) => {

    try{
        let targetPost = await PostModel.findOne({_id:request.body.postId})
        if(targetPost){
                targetPost.comments.push(request.body)
                await PostModel.updateOne({ _id: request.body.postId }, { $set: targetPost })
                return response.status(200).json(targetPost)
           
        }
    }catch(e){
        return response.status(500).json(e)
    }


}

export const  followInfluencer= async(request, response) => {

    try{
        // influencerId
        let targetUser = await UserModel.findOne({sub:request.body.sub})
        let targetInfluencer = await InfluencerModel.findOne({_id: request.body.influencerId})
        if(targetUser && targetInfluencer){
                targetInfluencer.subscribers.push({id: request.body.sub, userName: request.body.userName})
                targetUser.subsriptions.push(request.body.influencerId)
                await UserModel.updateOne({ sub: request.body.sub }, { $set: targetUser })
                await InfluencerModel.updateOne({ _id: request.body.influencerId }, { $set: targetInfluencer })
                return response.status(200).json(targetUser)
           
        }
    }catch(e){
        return response.status(500).json(e)
    }


}


export const  unfollowInfluencer= async(request, response) => {

    try{
        let targetUser = await UserModel.findOne({sub:request.body.sub})
        let targetInfluencer = await InfluencerModel.findOne({_id: request.body.influencerId})

        if(targetUser){
                const updatedUser = targetUser.subsriptions.filter(i => i !== request.body.influencerId)
                const updatedInfluencer = targetInfluencer.subscribers.filter(i => i.id !== request.body.sub)
                await UserModel.updateOne({ sub: request.body.sub }, { $set: updatedUser })
                await InfluencerModel.updateOne({ _id: request.body.influencerId }, { $set: updatedInfluencer })
                return response.status(200).json(updatedUser)
           
        }
    }catch(e){
        return response.status(500).json(e)
    }


}




export const  getSinglePostById= async(request, response) => {

    try{
        let targetPost = await PostModel.findOne({_id:request.query.postId})
        if(targetPost){
                return response.status(200).json(targetPost)
        }
    }catch(e){
        return response.status(500).json(e)
    }


}

export const getUserBySub= async(request, response) => {

    try{
        let targetUser = await UserModel.findOne({sub:request.query.sub})
        if(targetUser){
                return response.status(200).json(targetUser)
        }
    }catch(e){
        return response.status(500).json(e)
    }


}



export const pinInterest= async(request, response) => {
    const {userId, campaignId, postId} = request.body;
    try{
        let exist = await StaticsModel.findOne({userId, campaignId, postId})
        if(exist){
                return response.status(200).json({msg: "Already Exists"})
        }  
        const newRecord = new StaticsModel(request.body);
        await newRecord.save();
        return response.status(200).json(newRecord)
    }catch(e){
        return response.status(500).json(e)
    }


}

export const userStatics = async(request, response) =>{
    try{
        let totalInfuencers = (await InfluencerModel.find({})).length;
        let totalCampaign = (await CampaignModel.find({})).length;
        let totalVehicle = (await CampaignModel.find({})).length;
        let trendingVehicle = (await CampaignModel.find({}))[0].modelName || 'N/A'
        if(totalCampaign && totalInfuencers && totalVehicle && trendingVehicle){
            return response.status(200).json({totalInfuencers, totalCampaign, totalVehicle, trendingVehicle})
        } else{
            response.status(200).json({totalInfuencers: 'N/A', totalCampaign: 'N/A', totalVehicle:'N/A', trendingVehicle:'N/A'})
        }
    }catch(e){
        return response.status(500).json(e)
    }
}