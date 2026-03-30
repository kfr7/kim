import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    console.log('[subscribe] env:', {
      has_RESEND_API_KEY: Boolean(apiKey),
      has_RESEND_AUDIENCE_ID: Boolean(audienceId),
    });

    if (!apiKey || !audienceId) {
      console.error('[subscribe] Missing Resend configuration. Cannot add contact.');
      return NextResponse.json(
        { error: 'Newsletter is not ready yet. Please try again later.' },
        { status: 503 }
      );
    }

    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        email,
        first_name: typeof name === 'string' ? name.trim() : undefined,
        audience_id: audienceId,
        unsubscribed: false,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[subscribe] Resend error (contacts):', res.status, err);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    // Send welcome email (best-effort)
    // Kian has no verified sending domain; use Resend default sender.
    const from = 'onboarding@resend.dev';
    const replyTo = process.env.RESEND_REPLY_TO ?? 'kimberlyvanessagym@gmail.com';

    const subject = `Welcome${
      typeof name === 'string' && name.trim() ? ` ${name.trim()}` : ''
    } to KV Gym`;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: email,
        reply_to: replyTo,
        subject,
        html: `
          <div style="font-family: Inter, Arial, sans-serif; line-height: 1.6;">
            <p>Hey — welcome.</p>
            <p>You’re officially on the list. I’ll be sharing workouts, nutrition, and updates soon.</p>
            <p style="margin-top: 24px;">— Kimberly Vanessa</p>
          </div>
        `.trim(),
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.text();
      console.error('[subscribe] Resend error (emails):', emailRes.status, err);
      // Don't fail the signup if the welcome email fails
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
