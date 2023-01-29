import { Router } from "express";
import { verifyaccessToken,verifyRole } from "../middlewares/auth.middleware";

const router=Router();


router.post("/addEmail",verifyaccessToken,)
router.patch("/updateUser",verifyaccessToken,)




export default router;