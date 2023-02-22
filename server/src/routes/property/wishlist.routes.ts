import { Router } from "express";

import {verifyaccessToken,verifyRole} from "../../middlewares/auth.middleware"
const router=Router()
router.use(verifyaccessToken);
router.use(verifyRole(false));


router.post("/:id",)







export default router