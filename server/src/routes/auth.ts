//router function to create a router instance
import {Router} from "express"
//better to destructure then create a new instance and use that to acess request handler
import { registerUser } from "../controllers/auth"
const router=Router()

router.post("/registerUser",registerUser)












export default router