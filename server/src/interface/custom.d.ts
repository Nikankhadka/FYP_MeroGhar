


import * as jwt from "jsonwebtoken"
//use declaration mergin to type cast and add properties to jwt payload
declare module 'jsonwebtoken' {
    export interface jwt.JwtPayload {
       userId: string,
       is_Admin:boolean
   }
}




// declare module "express"{
//     export interface Request{
//         userData:{
//             userId:string,
//             is_Admin:boolean
//         }
//     }
// }


//this way no need to extend just modify the property

// declare module "express"{
//    export  interface Request.user{
//         userRole:boolean,
//     }
// }