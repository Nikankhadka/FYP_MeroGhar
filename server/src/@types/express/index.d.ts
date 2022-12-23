

//this works if used in normal ts file but not in .d.ts file 

// declare module "express-serve-static-core" {
//     interface Request {
//       user:{
//         userId:string,
//         is_Admin:boolean
//       } }}

//can be used to extend in the same way as above export newrequest extends request




//global type declaration merging for express 
  declare namespace Express {
        export interface Request {
          user:{
            userId:string,
            is_Admin:boolean
          }
        }    
}
    


