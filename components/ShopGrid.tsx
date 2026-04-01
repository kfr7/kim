'use client';

interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  price: string;
  currency: string;
  url: string;
}

interface Props {
  products: Product[];
  buyLabel: string;
}

export function ShopGrid({ products, buyLabel }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <a
          key={product.id}
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-surface rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10"
        >
          {/* Product Image */}
          {product.imageUrl && (
            <div className="aspect-square overflow-hidden bg-surface-2">
              <img
                src={product.imageUrl}
                alt={product.imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="p-5">
            <h3 className="font-serif text-lg font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">
              {product.title}
            </h3>

            {product.description && (
              <p className="text-text-muted text-sm mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            <div className="flex items-center justify-between mt-3">
              <span className="text-accent font-semibold text-lg">
                ${product.price} {product.currency}
              </span>
              <span className="px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-colors duration-200">
                {buyLabel}
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
