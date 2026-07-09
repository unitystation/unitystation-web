/** @type {import('next').NextConfig} */

module.exports = {
    reactCompiler: true,
    // Dev only: lets phones on the home network open the dev server via the
    // machine's LAN IP. Without this Next blocks its /_next dev resources for
    // non-localhost origins and pages render but never hydrate (dead buttons).
    allowedDevOrigins: ["192.168.1.*"],
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
