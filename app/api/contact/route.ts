import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    console.log('[contact] env:', {
      has_RESEND_API_KEY: Boolean(apiKey),
    });

    if (!apiKey) {
      console.log('[contact] No RESEND_API_KEY — inquiry received from:', email);
      // Don't hard-fail the UI if email sending isn't configured.
      return NextResponse.json({ ok: true });
    }

    // Kian has no verified sending domain; use Resend default sender.
    const from = 'onboarding@resend.dev';

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: 'kimberlyvanessagym@gmail.com',
        reply_to: email,
        subject: `Brand inquiry from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${String(message).replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[contact] Resend error:', res.status, errText);
      return NextResponse.json(
        { error: 'Failed to send', details: errText },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
