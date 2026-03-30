'use client';

import { useState } from 'react';

interface Props {
  heading: string;
  subheading: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  cta: string;
  directEmail: string;
  successMessage: string;
  errorMessage: string;
}

export function ContactForm({
  heading,
  subheading,
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  cta,
  directEmail,
  successMessage,
  errorMessage,
}: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-background border border-zinc-700 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors';

  return (
    <section>
      <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Contact</p>
      <h2 className="font-serif text-3xl font-bold text-text-primary mb-2">{heading}</h2>
      <p className="text-text-secondary mb-8">{subheading}</p>

      {status === 'success' ? (
        <div className="bg-surface-2 rounded-2xl p-8 text-center border border-accent/20">
          <p className="text-accent font-medium text-lg">{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={namePlaceholder}
            required
            className={inputClass}
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={emailPlaceholder}
            required
            className={inputClass}
          />
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={messagePlaceholder}
            required
            rows={5}
            className={inputClass + ' resize-none'}
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {status === 'loading' ? '...' : cta}
            </button>
            <span className="text-text-muted text-sm">
              {directEmail}{' '}
              <a
                href="mailto:kimberlyvanessagym@gmail.com"
                className="text-accent hover:text-accent-hover transition-colors"
              >
                kimberlyvanessagym@gmail.com
              </a>
            </span>
          </div>
        </form>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-3">{errorMessage}</p>
      )}
    </section>
  );
}
