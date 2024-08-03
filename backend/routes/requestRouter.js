import express from "express";
import {isAuthorized} from '../middlewares/auth.js'
import {getAllreq,postReq,acceptReq,getMyServices,getMyrequests,UpdateReq,delReq,getActivereq,getSingleRequest,CompletedRequests,CompletedServices} from '../controllers/requestController.js'


const router = express.Router();

router.get('/getAll',isAuthorized,getAllreq);
router.post('/postReq',isAuthorized,postReq);
router.get('/getMyser',isAuthorized,getMyServices);
router.get('/getMyReq',isAuthorized,getMyrequests);
router.put('/accpetReq/:id',isAuthorized,acceptReq);
router.put('/updReq/:id',isAuthorized,UpdateReq);
router.delete('/delreq/:id',isAuthorized,delReq);
router.get('/getAct',isAuthorized,getActivereq);
router.get('/ComReq',isAuthorized,CompletedRequests);
router.get('/ComSer',isAuthorized,CompletedServices);
router.get('/:id',isAuthorized,getSingleRequest);




export default router;