import { Router } from "express";
import { addEmailC, postKycC, updateProfileC, verifyEmailC } from "../controllers/user.controller";
import { verifyaccessToken,verifyRole } from "../middlewares/auth.middleware";
import { validateKyc, validateUpdateProfile } from "../middlewares/inputvalidation";

const router=Router();


router.post("/addEmail",verifyaccessToken,addEmailC)
router.get("/verifyEmail/:token",verifyEmailC)
router.patch("/updateProfile",verifyaccessToken,validateUpdateProfile,updateProfileC)
router.post("/postKyc",verifyaccessToken,verifyRole(false),validateKyc,postKycC)

router.patch("/updateUser",verifyaccessToken,)




export default router;