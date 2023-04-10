import { Router } from "express";
import { postReviewC } from "../../controllers/property/review.controller";
import { verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";
import { validateReviewInput } from "../../middlewares/inputvalidation";

const router=Router()




//crud opeartion except for read needs user access 
router.use(verifyaccessToken(true));
router.use(verifyRole(false))

router.post("/:id",validateReviewInput,postReviewC)





export default router;