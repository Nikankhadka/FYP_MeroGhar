//needs to be declared before the use case
declare module 'jsonwebtoken' {
    export interface JwtPayload {
       userId: string,
       is_Admin:boolean
   }

   export interface verifyEmailPayload extends JwtPayload {
    userId: string,
    Email:string
    }
}