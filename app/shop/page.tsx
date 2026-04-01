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

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  onlineStoreUrl: string | null;
}

async function getProducts(): Promise<ShopifyProduct[]> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!domain || !token) {
    console.error('[shop] Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_TOKEN');
    return [];
  }

  try {
    const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query: `{
          products(first: 20) {
            edges {
              node {
                id
                title
                handle
                description
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                onlineStoreUrl
              }
            }
          }
        }`,
      }),
      next: { revalidate: 300 }, // revalidate every 5 minutes
    });

    if (!res.ok) {
      console.error('[shop] Shopify API error:', res.status, await res.text());
      return [];
    }

    const data = await res.json();
    return data.data.products.edges.map((e: { node: ShopifyProduct }) => e.node);
  } catch (err) {
    console.error('[shop] Failed to fetch products:', err);
    return [];
  }
}

export default async function ShopPage() {
  const t = await getTranslations('shop');
  const products = await getProducts();

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
          id: p.id,
          title: p.title,
          handle: p.handle,
          description: p.description,
          imageUrl: p.images.edges[0]?.node.url ?? '',
          imageAlt: p.images.edges[0]?.node.altText ?? p.title,
          price: parseFloat(p.priceRange.minVariantPrice.amount).toFixed(2),
          currency: p.priceRange.minVariantPrice.currencyCode,
          url: p.onlineStoreUrl ?? `https://${process.env.SHOPIFY_STORE_DOMAIN}/products/${p.handle}`,
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
