/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 1. 解决跨域 HMR 报错 (直接放在根部，不加 experimental)
  allowedDevOrigins: ['64.83.1.168','suxinfurniture.com'],

  // 2. 彻底关闭所有悬浮调试窗 (Next.js 15/16 最新写法)
  devIndicators: false, 
}

export default nextConfig
