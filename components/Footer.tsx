import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="border-t border-zinc-800/50 bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Image
            src="/logos/KV-Logo-transparent-white.png"
            alt="KV Logo"
            width={48}
            height={48}
            className="object-contain opacity-80"
          />

          {/* Tagline */}
          <p className="text-text-secondary text-sm text-center font-serif italic">
            {t('tagline')}
          </p>

          {/* Social + contact */}
          <div className="flex items-center gap-6 text-sm text-text-secondary">
            <a
              href="https://www.instagram.com/kim.montepeque/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@kim.montepeque"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
              aria-label="TikTok"
            >
              TikTok
            </a>
            <a
              href="mailto:kimberlyvanessagym@gmail.com"
              className="hover:text-accent transition-colors"
            >
              {t('contact')}
            </a>
          </div>

          {/* Legal links */}
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <Link href="/privacy" className="hover:text-text-secondary transition-colors">
              {t('privacy')}
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-text-secondary transition-colors">
              {t('terms')}
            </Link>
          </div>

          <p className="text-xs text-text-muted">{t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
