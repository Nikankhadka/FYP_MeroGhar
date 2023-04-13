import { Router } from "express";
import { addEmailC, getPhoneC, getUserC, postKycC, updateProfileC, verifyEmailC,postPhoneC } from "../../controllers/user/user.controller";
import { verifyaccessToken,verifyRole } from "../../middlewares/auth.middleware";
import { validateKyc, validateProfile } from "../../middlewares/inputvalidation";

const router=Router();

router.get("/verifyEmail/:token",verifyEmailC)

router.get('/getUser/:id',getUserC)

router.post("/addEmail",addEmailC)
router.patch("/updateProfile",verifyaccessToken(true),validateProfile,updateProfileC)

//use the same api end point to update kyc information
router.post("/postKyc",validateKyc,postKycC)
router.patch("/updateUser",verifyaccessToken,)

//add middleware for both of these
router.get("/verifyPhone/:phone",verifyaccessToken(true),getPhoneC)
router.post("/verifyPhone/:phone",verifyaccessToken(true),postPhoneC)




export default router;