

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
