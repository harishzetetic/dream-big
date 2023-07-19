import express from 'express'
import { addUser, getState } from '../controller/userController.js';
import { signUpInfluencer, loginInfluencer, getAllActiveCampaign, likeDislike, joinCampaign, leaveCampaign } from '../controller/influencerController.js';
import { signUpBrand, loginBrand, createCampaign, getActiveCampaign, getFailedCampaign } from '../controller/brandController.js';

const Route = express.Router();

Route.post('/addUser', addUser);

Route.get('/getstates', getState);

Route.post('/signupinfluencer', signUpInfluencer)

Route.get('/loginInfluencer', loginInfluencer)

Route.post('/signUpBrand', signUpBrand)

Route.get('/loginBrand', loginBrand)

Route.post('/createCampaign', createCampaign)

Route.get('/getActiveCampaign', getActiveCampaign)

Route.get('/getFailedCampaign', getFailedCampaign)


Route.get('/getAllActiveCampaign', getAllActiveCampaign)

Route.put('/likeDislike', likeDislike)

Route.put('/joinCampaign', joinCampaign)
Route.put('/leaveCampaign', leaveCampaign)



export default Route