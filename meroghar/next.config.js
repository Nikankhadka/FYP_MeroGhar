/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    appDir:true,
  },
 


  // typescript: {
    
  //     // Dangerously allow production builds to successfully complete even if
  //     // your project has type errors.
  //     ignoreBuildErrors: true,
  //  },

  //  redirect handling for routes
   async redirects() {
    return [
      {
        source: '/',
        destination: '/Home',
        permanent: true,
      },
    ];
  },
  
}

module.exports = nextConfig
