import { Router } from "express";
import { createPropertyC, updateViewCountC } from "../../controllers/property/property.controller";
import { checkCookie, verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";
import { validateProperty } from "../../middlewares/inputvalidation";




const router=Router()

//view count sepeerate api for more accurate view count of the product
router.post("/createProperty",verifyaccessToken,verifyRole(false),validateProperty,createPropertyC)
router.patch("/updateViewCount/:id",checkCookie,verifyaccessToken,verifyRole(false),updateViewCountC)






export default router