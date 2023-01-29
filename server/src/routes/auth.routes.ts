
import {Router} from "express"
import { registerUserC,LoginC,refreshTokenC,googleLoginC,facebookLoginC,logOutC} from "../controllers/auth.controller"
import { validateInput } from "../middlewares/inputvalidation"
import dbConnect from "../configs/db"
import passport from "passport"

import "../configs/strategy"
import internal from "stream"
import { number } from "joi"



const router=Router()
router.use(dbConnect)

router.post("/registerUser",validateInput,registerUserC)
router.post("/login",validateInput,LoginC)



//since we are using token instead of session false 
router.get("/google-login",passport.authenticate("google",{scope:["profile","email"],session:false}))
router.get("/google-callback",passport.authenticate("google",{session:false}),googleLoginC)

//for facebook
router.get("/facebook-login",passport.authenticate("facebook",{scope:['email'],session:false}))
router.get("/facebook-callback",passport.authenticate("facebook",{session:false}),facebookLoginC)




//userVerification + Token rotation
router.post("/refreshToken",refreshTokenC)
router.delete("/logout",logOutC)
router.post("")















export default router