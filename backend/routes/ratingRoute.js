import express from 'express'
import {listRatings} from '../controllers/ratingController.js'
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';


const ratingRouter = express.Router();

ratingRouter.get('/list',listRatings)


export default ratingRouter