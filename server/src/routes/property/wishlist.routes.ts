import { Router } from "express";
import { addPropertyWishC, getWishListC, getWishPropertyListC } from "../../controllers/property/wishlist.controller";
import {verifyaccessToken,verifyRole} from "../../middlewares/auth.middleware"



const router=Router()
router.use(verifyaccessToken);
router.use(verifyRole(false));

router.get('/wishList',getWishListC)
router.get('/:wishId',getWishPropertyListC)
router.post("/:id/:wishList",addPropertyWishC)







export default router