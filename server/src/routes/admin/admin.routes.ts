
import { Router } from "express";
import { getKycRequestsC, getPropertyRequestsC, registerAdminC, verifyKycRequestsC, verifyPropertyRequestsC } from "../../controllers/admin/admin.controller";
import { verifyaccessToken, verifyRole } from "../../middlewares/auth.middleware";
import { validateInput } from "../../middlewares/inputvalidation";

const router=Router();

router.use(verifyaccessToken);
router.use(verifyRole(true))


router.post("/registerAdmin",validateInput,registerAdminC)
router.get("/kycRequests",getKycRequestsC)
router.patch("/kycRequests/:id",verifyKycRequestsC)
router.get("/propertyRequests",getPropertyRequestsC)
router.patch("/propertyRequests/:id",verifyPropertyRequestsC)








export default router;