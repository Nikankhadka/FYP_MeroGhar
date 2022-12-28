//router function to create a router instance
import {Router} from "express"
//better to destructure then create a new instance and use that to acess request handler
import { registerUserC,LoginC,refreshTokenC } from "../controllers/auth"
import { validateInput } from "../middlewares/inputvalidation"
// import { verifyaccessToken,verifyRole } from "../middlewares/auth"
import dbConnect from "../configs/db"

const router=Router()


//register db connect as a middleware 

router.use(dbConnect)

router.post("/registerUser",validateInput,registerUserC)
router.post("/Login",validateInput,LoginC)

//just verify token and reuse detection and send new tokens back to client
router.post("/refreshToken",refreshTokenC)











export default router