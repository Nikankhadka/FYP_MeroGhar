
import { Router } from "express";
import { getKycRequestsC, registerAdminC } from "../controllers/admin.controller";
import { verifyaccessToken, verifyRole } from "../middlewares/auth.middleware";
import { validateInput } from "../middlewares/inputvalidation";

const router=Router();

router.use(verifyaccessToken);
router.use(verifyRole(true))


router.post("/registerAdmin",validateInput,registerAdminC)
router.get("/kycRequests",getKycRequestsC)
router.patch("/kycRequests/:id")







export default router;