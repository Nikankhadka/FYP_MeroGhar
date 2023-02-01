
import { Router } from "express";
import { registerAdminC } from "../controllers/admin.controller";
import { verifyaccessToken, verifyRole } from "../middlewares/auth.middleware";
import { validateInput } from "../middlewares/inputvalidation";

const router=Router();

router.use(verifyaccessToken);
router.use(verifyRole(true))


router.post("/registerAdmin",validateInput,registerAdminC)









export default router;