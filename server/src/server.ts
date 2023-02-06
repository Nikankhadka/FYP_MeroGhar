//import express function and creare app instance 
import express from "express"
const app=express()


//necessary imports 
import * as dotenv from "dotenv"
import session from "express-session"
import cookieParser from "cookie-parser"
import cors from "cors"
import passport from "passport"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import YAML from "yamljs"



//importing routes
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import adminRoutes from "./routes/admin.routes"  
import { clearUser } from "./middlewares/auth.middleware"



//app level middleware setup
dotenv.config() 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    //defines the origin of the request
    origin:"http://localhost:3000",
    //headers can be accessed and modified else cant
    credentials:true
}))

app.use(session({
    secret:process.env.sessionSecret!,
    resave:false,
    saveUninitialized:false,
    cookie:{    
        maxAge:1000*60*60*24*7,
        //session data saved in http cookie which is only acessed in server
        httpOnly:true,
        //only accepts request from the https 
        secure:false,
    }

    //can store session data in db incase server crash the data is not lost
//  store:
}))

//attaches cookie from header to req object
app.use(cookieParser())

//imp middleware for using passport 
app.use(passport.initialize())

//this is not needed since i am using token based authentication 
//app.use(passport.session())

//basic logging will only log request to thr console
app.use(morgan('dev'))



//for swagger APi documentation 
const apiDocumentation = YAML.load("./src/utils/swagger.yml")
app.use("/apiDocs",swaggerUi.serve,swaggerUi.setup(apiDocumentation)) //the obj returned by docs using option will  be used ot loap apiDocumentation


//custom middle ware function which will clear req obj on evry api request before storing the actual data 
 app.use(clearUser)

//routes registration  before defning any routes 
//define prefix else nothing but the routepath should be uniqe
app.use("/auth/v1",authRoutes);
app.use("/user/v1",userRoutes)
app.use("/admin/v1",adminRoutes)




//listen to server on ports
app.listen(2900,
    async()=>console.log("server started at port 2900")
)







