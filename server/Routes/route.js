import express from 'express'
import { addUser, getState } from '../controller/userController.js';
import { signUpInfluencer, loginInfluencer } from '../controller/influencerController.js';
import { signUpBrand, loginBrand } from '../controller/brandController.js';

const Route = express.Router();

Route.post('/addUser', addUser);

Route.get('/getstates', getState);

Route.post('/signupinfluencer', signUpInfluencer)

Route.get('/loginInfluencer', loginInfluencer)

Route.post('/signUpBrand', signUpBrand)

Route.get('/loginBrand', loginBrand)




export default Route