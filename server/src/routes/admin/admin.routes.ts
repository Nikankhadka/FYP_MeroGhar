
import { Router } from "express";
import { getKycRequestsC, registerAdminC, verifyKycRequestsC } from "../../controllers/admin/admin.controller";
import { verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";
import { validateInput } from "../../middlewares/inputvalidation";

const router=Router();

router.use(verifyaccessToken);
router.use(verifyRole(true))


router.post("/registerAdmin",validateInput,registerAdminC)
router.get("/kycRequests",getKycRequestsC)
router.patch("/kycRequests/:id",verifyKycRequestsC)







export default router;