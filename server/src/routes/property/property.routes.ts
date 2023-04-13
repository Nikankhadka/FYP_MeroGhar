import { Router } from "express";
import { createPropertyC, deletePropertyC, getPropertyByIdC, updatePropertyC, updateViewCountC } from "../../controllers/property/property.controller";
import {  verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";
import { validatePropertyInput, validatePropertyUpdate } from "../../middlewares/inputvalidation";

//import other router related to property 
import reviewRoutes from "./review.routes"
import wishlistRoutes from './wishlist.routes'
import bookingRoutes from "./booking.routes"
const router=Router()

//register routes
router.use("/review",reviewRoutes);
router.use("/wishList",wishlistRoutes);
router.use("/booking",bookingRoutes)


router.get("/getProperty/:id",verifyaccessToken(false),verifyRole(false),getPropertyByIdC)
router.patch("/updateViewCount/:id",verifyaccessToken(false),verifyRole(false),updateViewCountC)

router.use(verifyaccessToken(true));
router.use(verifyRole(false));
//view count sepeerate api for more accurate view count of the product

router.post("/createProperty",validatePropertyInput,createPropertyC)
router.patch("/updateProperty/:id",validatePropertyUpdate,updatePropertyC)
router.delete("/deleteProperty/:id",deletePropertyC)

//api to fetch user previously viwed property 
router.get('/getViewedProperty',)






export default router