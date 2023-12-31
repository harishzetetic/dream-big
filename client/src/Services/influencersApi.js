

import axios from "axios";

const URL = 'http://localhost:9000';
export const signUpInfluencer = async (data) => {
    try{
        return await axios.post(`${URL}/signupinfluencer`, data)
    } catch(e){
        console.log('Getting error while signup influencer', e)
    }
}

export const loginInfluencer = async (data) => {
    try{
        return await axios.get(`${URL}/loginInfluencer`, {params: data})
    } catch(e){
        console.log('Getting error while login influencer', e)
    }
}

export const likeDislike = async (data) => {
    try{
        return await axios.put(`${URL}/likeDislike`, data)
    } catch(e){
        console.log('Getting error while like/dislike', e)
    }
}

export const joinCampaign = async(data) => {
    try{
        return await axios.put(`${URL}/joinCampaign`, data)
    } catch(e){
        console.log('Getting error while joinCampaign', e)
    }
}

export const leaveCampaign = async(data) => {
    try{
        return await axios.put(`${URL}/leaveCampaign`, data)
    } catch(e){
        console.log('Getting error while leaveCampaign', e)
    }
}

export const getInfluencerAssignedCampaign = async(data) => {
    try{
        return await axios.get(`${URL}/getInfluencerAssignedCampaign`, {params: data})
    } catch(e){
        console.log('Getting error while getting getInfluencerAssignedCampaign', e)
    }
}


export const newBlogPost = async(data) => {
    try{
        return await axios.post(`${URL}/newBlogPost`, data)
    } catch(e){
        console.log('Getting error while getting newBlogPost', e)
    }
}


export const fetchAllPostForInfluencer = async(data) => {
    try{
        return await axios.get(`${URL}/fetchAllPostForInfluencer`, {params: data})
    } catch(e){
        console.log('Getting error while getting fetchAllPostForInfluencer', e)
    }
}

export const getSingleCampaignById = async(id) => {
    try{
        return await axios.get(`${URL}/getSingleCampaignById`, {params: id})
    } catch(e){
        console.log('Getting error while getting getSingleCampaignById', e)
    }
}


export const getInfluencerById = async(id) => {
    try{
        return await axios.get(`${URL}/getInfluencerById`, {params: id})
    } catch(e){
        console.log('Getting error while getting getInfluencerById', e)
    }
}

export const getTopInfluencers = async() => {
    try{
        return await axios.get(`${URL}/getTopInfluencers`)
    } catch(e){
        console.log('Getting error while getting getTopInfluencers', e)
    }
}

export const getStaticsByInfluencerId = async(data)=>{
    try{
        return await axios.get(`${URL}/getStaticsByInfluencerId`, {params: data})
    }catch(e){
        console.log('Getting error while getting getStaticsByInfluencerId', e)
    }
}

export const getInfluencerStatics = async(data)=>{
    try{
        return await axios.get(`${URL}/getInfluencerStatics`, {params: data})
    }catch(e){
        console.log('Getting error while getting getInfluencerStatics', e)
    }
}