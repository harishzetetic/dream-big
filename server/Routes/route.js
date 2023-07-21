import express from 'express'
import { addUser, getState, fetchAllPostForUser } from '../controller/userController.js';
import { signUpInfluencer, loginInfluencer, getAllActiveCampaign, likeDislike, joinCampaign, leaveCampaign, getInfluencerAssignedCampaign, newBlogPost, fetchAllPostForInfluencer, getSingleCampaignById, getInfluencerById, getTopInfluencers } from '../controller/influencerController.js';
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

Route.get('/getInfluencerAssignedCampaign', getInfluencerAssignedCampaign)

Route.post('/newBlogPost', newBlogPost)

Route.get('/fetchAllPostForInfluencer', fetchAllPostForInfluencer)

Route.get('/getSingleCampaignById', getSingleCampaignById)

Route.get('/fetchAllPostForUser', fetchAllPostForUser)

Route.get('/getInfluencerById', getInfluencerById)

Route.get('/getTopInfluencers', getTopInfluencers)

export default Route