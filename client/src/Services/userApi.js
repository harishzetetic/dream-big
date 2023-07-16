

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
