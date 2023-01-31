import { Router } from "express";
import { addEmailC, postKycC, updateProfileC, verifyEmailC } from "../controllers/user.controller";
import { verifyaccessToken,verifyRole } from "../middlewares/auth.middleware";
import { validateKyc, validateUpdateProfile } from "../middlewares/inputvalidation";

const router=Router();

router.get("/verifyEmail/:token",verifyEmailC)

router.use(verifyaccessToken)
router.post("/addEmail",addEmailC)

router.patch("/updateProfile",validateUpdateProfile,updateProfileC)
router.post("/postKyc",verifyRole(false),validateKyc,postKycC)
router.patch("/updateUser",verifyaccessToken,)




export default router;