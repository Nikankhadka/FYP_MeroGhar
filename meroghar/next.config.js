/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    appDir:true,
  },
  webpack(config){
    config.module.rules.push({
      test:/\.svg$/,
      use:[{loader:'@svgr/webpack',options:{icon:true}}]
    })
    return config
  },


  typescript: {
    
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
  
      ignoreBuildErrors: true,
   },


  
}

module.exports = nextConfig
