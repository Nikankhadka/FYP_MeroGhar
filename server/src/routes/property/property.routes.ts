import { Router } from "express";
import { createPropertyC, getPropertyC, updatePropertyC, updateViewCountC } from "../../controllers/property/property.controller";
import { checkCookie, verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";
import { validatePropertyInput, validatePropertyUpdate } from "../../middlewares/inputvalidation";

//import other router related to property 
import reviewRoutes from "./review.routes"


const router=Router()

//register routes
router.use("/review",reviewRoutes);

//view count sepeerate api for more accurate view count of the product
router.get("/getProperty/:id",checkCookie,verifyaccessToken,verifyRole(false),getPropertyC)
router.post("/createProperty",verifyaccessToken,verifyRole(false),validatePropertyInput,createPropertyC)
router.patch("/updateProperty/:id",verifyaccessToken,verifyRole(false),validatePropertyUpdate,updatePropertyC)
router.delete("/deleteProperty/:id",verifyaccessToken)
router.patch("/updateViewCount/:id",checkCookie,verifyaccessToken,verifyRole(false),updateViewCountC)






export default router