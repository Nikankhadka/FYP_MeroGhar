
import {Router} from "express"
import { registerUserC,LoginC,refreshTokenC } from "../controllers/auth"
import { validateInput } from "../middlewares/inputvalidation"
import dbConnect from "../configs/db"

const router=Router()


router.use(dbConnect)

router.post("/registerUser",validateInput,registerUserC)
router.post("/login",validateInput,LoginC)
//userVerification + Token rotation
router.post("/refreshToken",refreshTokenC)
router.delete("/logout")













export default router