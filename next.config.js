/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NODE_ENV === 'production' ? '/{datebetter}' : '',
    assetPrefix: process.env.NODE_ENV === 'production' ? '/{datebetter}/' : '',
}

module.exports = nextConfig
