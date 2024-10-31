/** @type {import('next').NextConfig} */
// const nextConfig = {
//   async headers() {
//     return [
//       {
//         // matching all API routes
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
//           { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
//         ]
//       }
//     ]
//   }
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '127.0.0.1',
//         port: '1337',
//         pathname: '/uploads/**',
//       },
//     ],
//   },
// }

// module.exports = nextConfig

module.exports = {
  // reactStrictMode: true,
  // output: 'export',
  // skipTrailingSlashRedirect: true,
  // distDir: 'dist',
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         { key: 'Access-Control-Allow-Origin', value: '*' },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value:
  //             'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //         },
  //       ],
  //     },
  //   ]
  // },
  images: {
    // unoptimized: true,
    loader: 'custom',
    loaderFile: './src/app/my-loader.ts',
    remotePatterns: [
      {
        // replace remote patterns when production
        // patterns for production just below
        // protocol: 'https',
        // hostname: 'strapi-reunion-pingenerator.onrender.com',
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dlm2lmaxc/image/upload/**',
        // patterns for local dev just below
        // protocol: 'http',
        // hostname: '127.0.0.1',
        // port: '1337',
        // keep line below for all environments but cloudinary
        // pathname: '/uploads/**',
      },
    ],
    // disableStaticImages: true,
  },
  // experimental: {
  //   typedRoutes: true,
  // },
  // output: 'export',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
}
