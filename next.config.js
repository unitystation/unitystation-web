/** @type {import('next').NextConfig} */

module.exports = {
    reactCompiler: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.unitystation.org",
                port: "",
                pathname: "/**/**",
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/attachments/**",
            },
            {
                protocol: "https",
                hostname: "user-images.githubusercontent.com",
                port: "",
                pathname: "/**/**",
            },
        ],
    },
};
