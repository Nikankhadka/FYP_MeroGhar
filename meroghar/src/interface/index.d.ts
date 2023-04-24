export {};

declare global {
  interface Window {
    recaptchaVerifier: any; // 👈️ turn off type checking
    confirmationResult:any
  }
}


declare module 'khalti-checkout-web'{
  const value:any,
  
}

