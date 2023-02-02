//needs to be declared before the use case
declare namespace jsonwebtoken {
    export interface JwtPayload {
       userId: string,
       is_Admin:boolean
   }
}