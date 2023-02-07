import { Router } from "express";
import { updateViewCountC } from "../../controllers/property/property.controller";
import { checkCookie, verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";




const router=Router()

//view count sepeerate api for more accurate view count of the product
router.post("/createProperty",)
router.patch("/updateViewCount/:id",checkCookie,verifyaccessToken,verifyRole(false),updateViewCountC)






export default router