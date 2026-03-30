import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { LanguageToggle } from './LanguageToggle';
import { MobileNav } from './MobileNav';
import { NavLinks } from './NavLinks';

export async function Navbar() {
  const t = await getTranslations('nav');
  const locale = await getLocale();

  const links = [
    { href: '/workouts', label: t('workouts') },
    { href: '/diet', label: t('diet') },
    { href: '/start-over', label: t('startOver') },
    { href: '/work-with-me', label: t('workWithMe') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/logos/KV-Logo-transparent-white.png"
              alt="KV Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop nav — client component for active state */}
          <NavLinks links={links} />

          {/* Right: lang toggle + mobile hamburger */}
          <div className="flex items-center gap-3">
            <LanguageToggle currentLocale={locale} label={t('toggleLang')} />
            <MobileNav links={links} />
          </div>
        </div>
      </div>
    </header>
  );
}
