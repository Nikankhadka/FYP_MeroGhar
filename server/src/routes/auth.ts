//router function to create a router instance
import {Router} from "express"
//better to destructure then create a new instance and use that to acess request handler
import { registerUserC } from "../controllers/auth"
import { validateRegister } from "../middlewares/inputvalidation"
const router=Router()




router.post("/registerUser",validateRegister,registerUserC)












export default router