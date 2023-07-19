

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
