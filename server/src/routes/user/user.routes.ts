import { Router } from "express";
import { addEmailC, getPhoneC, getUserC,getMeC, postKycC, updateProfileC, verifyEmailC,postPhoneC } from "../../controllers/user/user.controller";
import { verifyaccessToken,verifyRole } from "../../middlewares/auth.middleware";
import { validateKyc, validateProfile } from "../../middlewares/inputvalidation";

const router=Router();

router.get("/verifyEmail/:token",verifyEmailC)

//get user data for normal as well as currrent user
router.get('/getUser/:id',getUserC)

//get user data for account setting
router.get('/getMe',verifyaccessToken(true),getMeC)

router.post("/addEmail",addEmailC)
router.patch("/updateProfile",verifyaccessToken(true),validateProfile,updateProfileC)

//use the same api end point to update kyc information
router.post("/postKyc",verifyaccessToken(true),validateKyc,postKycC)

router.patch("/updateUser",verifyaccessToken,)

//add middleware for both of these
router.get("/verifyPhone/:phone",verifyaccessToken(true),getPhoneC)
router.post("/verifyPhone/:phone",verifyaccessToken(true),postPhoneC)




export default router;