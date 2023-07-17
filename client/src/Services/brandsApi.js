

import axios from "axios";

const URL = 'http://localhost:9000';
export const signUpBrand = async (data) => {
    try{
        return await axios.post(`${URL}/signUpBrand`, data)
    } catch(e){
        console.log('Getting error while signup brand', e)
    }
}

export const loginBrand = async (data) => {
    try{
        return await axios.get(`${URL}/loginBrand`, {params: data})
    } catch(e){
        console.log('Getting error while login influencer', e)
    }
}

export const createCampaign = async(data) => {
    try{
        return await axios.post(`${URL}/createCampaign`, data)
    }catch(e){
        console.log('Getting Error while creating campaign')
    }
}

export const getActiveCampaign = async(brandId) => {
    try{
        return await axios.get(`${URL}/getActiveCampaign`, {params:{brandId}})
    }catch(e){
        console.log('Getting Error while getting active campaign')
    }
}


export const getFailedCampaign = async(brandId) => {
    try{
        return await axios.get(`${URL}/getFailedCampaign`, {params:{brandId}})
    }catch(e){
        console.log('Getting Error while getting active campaign')
    }
}

