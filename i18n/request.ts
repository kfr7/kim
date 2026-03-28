import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get('kim_lang')?.value ?? 'en';
  const locale = ['en', 'es'].includes(raw) ? raw : 'en';

  return {
    locale,
    messages: (await import(`../locales/${locale}/common.json`)).default,
  };
});
