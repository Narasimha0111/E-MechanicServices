import express from "express";
import {register,login,logout,valUser,delUser,getUser,getUsers,getVerUsers} from '../controllers/userController.js'
import {isAuthorized} from '../middlewares/auth.js'

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/logout',isAuthorized,logout);
router.put('/val/:id',isAuthorized,valUser);
router.delete('/deluser/:id',isAuthorized,delUser);
router.get('/getuser',isAuthorized,getUser);
router.get('/getAll',isAuthorized,getUsers);
router.get('/getveruser',isAuthorized,getVerUsers);
export default router;