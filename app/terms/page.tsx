import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('terms');
  return { title: t('pageTitle') };
}

export default async function TermsPage() {
  const t = await getTranslations('terms');
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl font-bold text-text-primary mb-2">{t('heading')}</h1>
      <p className="text-text-muted text-sm mb-10">{t('lastUpdated')}</p>
      <div className="space-y-6 text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Acceptance of Terms</h2>
          <p>By accessing kimberlyvanessa.com, you agree to these Terms of Service. If you do not agree, please do not use this site.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Content</h2>
          <p>All content on this site — including workout plans, nutrition information, photos, and written content — is for informational purposes only. It is not medical or professional fitness advice. Consult a qualified professional before starting any fitness or nutrition program.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Intellectual Property</h2>
          <p>All content, images, and branding on this site are the property of Kim Montepeque. You may not reproduce, distribute, or use them without explicit written permission.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Limitation of Liability</h2>
          <p>Kim Montepeque is not liable for any injuries, losses, or damages resulting from use of information on this site. Use all fitness and nutrition content at your own risk.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Changes</h2>
          <p>We reserve the right to update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Contact</h2>
          <p>Questions about these terms? Email <a href="mailto:kimberlyvanessagym@gmail.com" className="text-accent">kimberlyvanessagym@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
