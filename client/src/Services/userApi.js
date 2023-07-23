

import axios from "axios";

const URL = 'http://localhost:9000';
export const addUser = async (data) => {
    try{
        const result = await axios.post(`${URL}/addUser`, data);
        return result
    } catch(e){
        console.log('Getting error while add user', e)
    }
}

export const fetchAllPostForUser = async() => {
    try{
        return await axios.get(`${URL}/fetchAllPostForUser`)
    } catch(e){
        console.log('Getting error while getting fetchAllPostForUser', e)
    }
}

export const likePost = async(data) => {
    try{
        return await axios.put(`${URL}/likePost`, data)
    } catch(e){
        console.log('Getting error while getting likePost', e)
    }
}

export const disLikePost = async(data) => {
    try{
        return await axios.put(`${URL}/disLikePost`, data)
    } catch(e){
        console.log('Getting error while getting disLikePost', e)
    }
}

export const postComment = async(data)=>{
    try{
        return await axios.put(`${URL}/postComment`, data)
    } catch(e){
        console.log('Getting error while getting postComment', e)
    }
}

export const followInfluencer = async(data) => {
    try{
        return await axios.put(`${URL}/followInfluencer`, data)
    } catch(e){
        console.log('Getting error while getting followInfluencer', e)
    }
}

export const unfollowInfluencer = async(data) => {
    try{
        return await axios.put(`${URL}/unfollowInfluencer`, data)
    } catch(e){
        console.log('Getting error while getting unfollowInfluencer', e)
    }
}

export const getSinglePostById = async(data) => {
    try{
        return await axios.get(`${URL}/getSinglePostById`, {params: data})
    } catch(e){
        console.log('Getting error while getting getSinglePostById', e)
    }
}


export const getUserBySub = async(data)=>{
    try{
        return await axios.get(`${URL}/getUserBySub`, {params: data})
    } catch(e){
        console.log('Getting error while getting getUserBySub', e)
    }
}

export const pinInterest = async(data) => {
    try{
        return await axios.post(`${URL}/pinInterest`, data)
    } catch(e){
        console.log('Getting error while getting pinInterest', e)
    }
}

export const userStatics= async() => {
    try{
        return await axios.get(`${URL}/userStatics`)
    } catch(e){
        console.log('Getting error while getting userStatics', e)
    }
}