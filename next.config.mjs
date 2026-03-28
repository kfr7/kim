
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.instagram.com' },
      { protocol: 'https', hostname: 'instagram.com' },
      { protocol: 'https', hostname: 'cdninstagram.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
