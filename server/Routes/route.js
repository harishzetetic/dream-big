import express from 'express'
import { addUser } from '../controller/userController.js';

const route = express.Router();

route.post('/addUser', addUser);



export default route