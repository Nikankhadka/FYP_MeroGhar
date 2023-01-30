import { Router } from "express";
import { addEmailC, updateProfileC, verifyEmailC } from "../controllers/user.controller";
import { verifyaccessToken,verifyRole } from "../middlewares/auth.middleware";
import { validateUpdateProfile } from "../middlewares/inputvalidation";

const router=Router();


router.post("/addEmail",verifyaccessToken,addEmailC)
router.get("/verifyEmail/:token",verifyEmailC)
router.patch("/updateProfile",verifyaccessToken,validateUpdateProfile,updateProfileC)

router.patch("/updateUser",verifyaccessToken,)




export default router;