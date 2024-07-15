/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                pathname: '/u/4043157',
            },
        ],
    },
    sassOptions: {
        includePaths: ['@/styles'],
    },
};

export default nextConfig;
