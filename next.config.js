/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'unitystationfile.b-cdn.net',
                port: '',
                pathname: '/**/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.discordapp.com',
                port: '',
                pathname: '/attachments/**',
            },
            {
                protocol: 'https',
                hostname: 'user-images.githubusercontent.com',
                port: '',
                pathname: '/**/**',
            }
        ],
    },
}