import express from 'express'
import { addUser, getState } from '../controller/userController.js';
import { signUpInfluencer, loginInfluencer } from '../controller/influencerController.js';

const Route = express.Router();

Route.post('/addUser', addUser);

Route.get('/getstates', getState);

Route.post('/signupinfluencer', signUpInfluencer)

Route.get('/loginInfluencer', loginInfluencer)




export default Route