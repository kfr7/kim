import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ShopGrid } from '@/components/ShopGrid';
import { ScrollReveal } from '@/components/ScrollReveal';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta.shop');
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
  };
}

interface ShopifyImage {
  id: number;
  src: string;
  alt: string | null;
}

interface ShopifyVariant {
  price: string;
}

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}

async function getProducts(): Promise<ShopifyProduct[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ACCESS_TOKEN;

  if (!domain || !token) {
    console.error('[shop] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ACCESS_TOKEN');
    return [];
  }

  try {
    const res = await fetch(
      `https://${domain}/admin/api/2026-04/products.json?limit=20&status=active`,
      {
        headers: {
          'X-Shopify-Access-Token': token,
        },
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      console.error('[shop] Shopify API error:', res.status, await res.text());
      return [];
    }

    const data = await res.json();
    return data.products ?? [];
  } catch (err) {
    console.error('[shop] Failed to fetch products:', err);
    return [];
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default async function ShopPage() {
  const t = await getTranslations('shop');
  const products = await getProducts();
  const domain = process.env.SHOPIFY_STORE_DOMAIN;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <ScrollReveal>
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            {t('label')}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4">
            {t('heading')}
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            {t('subheading')}
          </p>
        </div>
      </ScrollReveal>

      {products.length > 0 ? (
        <ShopGrid products={products.map((p) => ({
          id: String(p.id),
          title: p.title,
          handle: p.handle,
          description: p.body_html ? stripHtml(p.body_html) : '',
          imageUrl: p.images[0]?.src ?? '',
          imageAlt: p.images[0]?.alt ?? p.title,
          price: parseFloat(p.variants[0]?.price ?? '0').toFixed(2),
          currency: 'USD',
          url: `https://${domain}/products/${p.handle}`,
        }))} buyLabel={t('buy')} />
      ) : (
        <ScrollReveal>
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">{t('empty')}</p>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
