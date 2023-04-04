import { Router } from "express";
import { addEmailC, getPhoneC, getUserC, postKycC, updateProfileC, verifyEmailC,postPhoneC } from "../../controllers/user/user.controller";
import { verifyaccessToken,verifyRole } from "../../middlewares/auth.middleware";
import { validateKyc, validateProfile } from "../../middlewares/inputvalidation";

const router=Router();

router.get("/verifyEmail/:token",verifyEmailC)

router.use(verifyaccessToken)
router.get('/userData',getUserC)
router.post("/addEmail",addEmailC)
router.patch("/updateProfile",validateProfile,updateProfileC)
//use the same api end point to update kyc information
router.post("/postKyc",verifyRole(false),validateKyc,postKycC)
router.patch("/updateUser",verifyaccessToken,)

//add middleware for both of these
router.get("/verifyPhone/:phone",verifyaccessToken,getPhoneC)
router.post("/verifyPhone/:phone",verifyaccessToken,postPhoneC)




export default router;