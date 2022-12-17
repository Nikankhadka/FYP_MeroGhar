//router function to create a router instance
import {Router} from "express"
//better to destructure then create a new instance and use that to acess request handler
import { registerUserC,LoginC } from "../controllers/auth"
import { validateAuth } from "../middlewares/inputvalidation"
import dbConnect from "../configs/db"

const router=Router()


//register db connect as a middleware 

router.use(dbConnect)

router.post("/registerUser",validateAuth,registerUserC)
router.post("/Login",validateAuth,LoginC)

//this will be used to refresh the access token and also authenticate user on each page request
router.post("/refreshToken",)










export default router