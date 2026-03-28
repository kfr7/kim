'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function setLocale(locale: string) {
  const valid = ['en', 'es'];
  const resolved = valid.includes(locale) ? locale : 'en';
  const cookieStore = await cookies();
  cookieStore.set('kim_lang', resolved, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  revalidatePath('/');
}
