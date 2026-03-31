import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { AnniversaryModal } from '@/components/AnniversaryModal';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.home');

  return {
    title: {
      default: t('title'),
      template: '%s | Kimberly Vanessa',
    },
    description: t('description'),
    metadataBase: new URL('https://kimberlyvanessa.com'),
    openGraph: {
      siteName: 'Kimberly Vanessa',
      type: 'website',
      images: [{ url: '/og', width: 1200, height: 630, alt: 'Kimberly Vanessa' }],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['/og'],
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body className="bg-background text-text-primary font-sans antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="pt-16 min-h-screen">{children}</main>
          <Footer />
          <BackToTop />
          <AnniversaryModal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
