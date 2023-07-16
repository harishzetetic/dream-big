

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
