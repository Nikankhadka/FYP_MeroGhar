import express from "express"
import  * as test  from "./test.js"
const app=express()




app.use(express.json())
app.use(express.urlencoded({extended:true}))







app.listen(2900,()=>{
   console.log(test.greet({name:"test",age:20}))
   console.log("server started")
    console.log("server is rsdson port 2900")
})