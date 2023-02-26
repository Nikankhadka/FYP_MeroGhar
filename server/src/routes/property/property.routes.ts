import { Router } from "express";
import { createPropertyC, deletePropertyC, getPropertyByIdC, updatePropertyC, updateViewCountC } from "../../controllers/property/property.controller";
import { checkCookie, verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";
import { validatePropertyInput, validatePropertyUpdate } from "../../middlewares/inputvalidation";

//import other router related to property 
import reviewRoutes from "./review.routes"
import wishlistRoutes from './wishlist.routes'

const router=Router()

//register routes
router.use("/review",reviewRoutes);
router.use("/wishList",wishlistRoutes);

//view count sepeerate api for more accurate view count of the product
router.get("/getProperty/:id",checkCookie,verifyaccessToken,verifyRole(false),getPropertyByIdC)
router.post("/createProperty",verifyaccessToken,verifyRole(false),validatePropertyInput,createPropertyC)
router.patch("/updateProperty/:id",verifyaccessToken,verifyRole(false),validatePropertyUpdate,updatePropertyC)

router.delete("/deleteProperty/:id",verifyaccessToken,verifyRole(false),deletePropertyC)
router.patch("/updateViewCount/:id",checkCookie,verifyaccessToken,verifyRole(false),updateViewCountC)






export default router