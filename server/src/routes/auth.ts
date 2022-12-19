//router function to create a router instance
import {Router} from "express"
//better to destructure then create a new instance and use that to acess request handler
import { registerUserC,LoginC } from "../controllers/auth"
import { validateAuth } from "../middlewares/inputvalidation"
import { tokenExtractor } from "../middlewares/auth"
import dbConnect from "../configs/db"

const router=Router()


//register db connect as a middleware 

router.use(dbConnect)

router.post("/registerUser",validateAuth,registerUserC)
router.post("/Login",validateAuth,LoginC)

//route to verify user on each page load and also provide new refresh and access token
router.post("/refreshToken",tokenExtractor)










export default router