import { Router } from "express";
import { addPropertyWishC, getWishListC, getWishPropertyListC, removeProperyC } from "../../controllers/property/wishlist.controller";
import {verifyaccessToken,verifyRole} from "../../middlewares/auth.middleware"



const router=Router()
router.use(verifyaccessToken(true));
router.use(verifyRole(false));

router.get('/wishList',getWishListC)
router.get('/:wishId',getWishPropertyListC)
//get specific property is going to use same api as the get products by id 
router.post("/:id/:wishList",addPropertyWishC)

//only use property id since wishlist can be removed from anywhere from home page or wishlist or direct property
router.delete("/:propertyId",removeProperyC)






export default router