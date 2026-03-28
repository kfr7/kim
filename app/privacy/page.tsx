import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy');
  return { title: t('pageTitle') };
}

export default async function PrivacyPage() {
  const t = await getTranslations('privacy');
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-4xl font-bold text-text-primary mb-2">{t('heading')}</h1>
      <p className="text-text-muted text-sm mb-10">{t('lastUpdated')}</p>
      <div className="prose-content space-y-6 text-text-secondary leading-relaxed">
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Information We Collect</h2>
          <p>We collect information you voluntarily provide, such as your email address when you sign up for our newsletter. We may also collect basic analytics data (pages visited, session duration) through Google Analytics.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">How We Use Your Information</h2>
          <p>Your email address is used solely to send you newsletters and fitness content from Kim Montepeque. We do not sell or share your personal information with third parties for marketing purposes.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Cookies</h2>
          <p>This site uses a language preference cookie (<code className="text-accent bg-surface px-1 rounded">kim_lang</code>) to remember your language choice. We also use Google Analytics cookies for site usage analysis. You can disable cookies in your browser settings.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Third-Party Services</h2>
          <p>We use Google Analytics for analytics. Their privacy policy applies to data collected by their service. We use Resend to manage email subscriptions.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Your Rights</h2>
          <p>You may unsubscribe from our newsletter at any time via the link in any email. To request deletion of your data, contact us at <a href="mailto:kimberlyvanessagym@gmail.com" className="text-accent">kimberlyvanessagym@gmail.com</a>.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl font-bold text-text-primary mb-2">Contact</h2>
          <p>For privacy-related questions, email <a href="mailto:kimberlyvanessagym@gmail.com" className="text-accent">kimberlyvanessagym@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
