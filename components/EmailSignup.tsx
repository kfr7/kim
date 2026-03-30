'use client';

import { useState } from 'react';

interface Props {
  label: string;
  heading: string;
  subheading: string;
  namePlaceholder: string;
  placeholder: string;
  cta: string;
  successMessage: string;
  errorMessage: string;
}

export function EmailSignup({
  label,
  heading,
  subheading,
  namePlaceholder,
  placeholder,
  cta,
  successMessage,
  errorMessage,
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-surface-2 rounded-2xl px-6 py-12 md:px-12 text-center">
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">{label}</p>
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-3">{heading}</h2>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">{subheading}</p>

      {status === 'success' ? (
        <p className="text-accent font-medium">{successMessage}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={namePlaceholder}
            className="w-full px-4 py-3 bg-background border border-zinc-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 px-4 py-3 bg-background border border-zinc-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? '...' : cta}
            </button>
          </div>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-3">{errorMessage}</p>
      )}
    </section>
  );
}
