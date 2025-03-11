import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';
import isAdmin from '../middleware/isAdmin.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/isAdmin',isAdmin)

export default userRouter;


