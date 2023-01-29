
//i think in the new update declare global doesnot work so just use name space and modify the interface
declare namespace NodeJS {
      interface ProcessEnv {
          user:string,
          pass:string,
          mailupdateSecret:string,
      }
 }
  