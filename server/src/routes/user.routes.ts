import { Router } from "express";
import { addEmailC, verifyEmailC } from "../controllers/user.controller";
import { verifyaccessToken,verifyRole } from "../middlewares/auth.middleware";

const router=Router();


router.post("/addEmail",verifyaccessToken,addEmailC)
router.get("/verifyEmail/:token",verifyEmailC)
router.patch("/updateUser",verifyaccessToken,)




export default router;