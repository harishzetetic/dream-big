

import axios from "axios";

const URL = 'http://localhost:9000';
export const addUser = async (data) => {
    try{
        axios.post(`${URL}/addUser`, data)
    } catch(e){
        console.log('Getting error while add user', e)
    }
}