# Kimberly Montepeque — Personal Brand Website Plan

## About
- **Name:** Kimberly Vanessa Montepeque
- **Brand name:** Kim Montepeque
- **Instagram:** @kim.montepeque (2,204 followers)
- **TikTok:** @kim.montepeque
- **Niche:** Glutes & legs, strength training, fitness lifestyle
- **Location:** Los Angeles, CA

---

## Goals of the Site
1. **Replace Linktree** — one link in bio that does everything
2. **Attract brand sponsors** — professional, metrics-forward
3. **Build community** — capture emails, drive IG/TikTok follows
4. **Monetize** — affiliate links, digital products, coaching (future)

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Domain:** kimberlyvanessa.com (purchased on Vercel — tie project to this domain on deploy)
- **Forms:** Formspree or Google Sheets API
- **i18n:** next-intl with locales/en/ and locales/es/ JSON files
- **Analytics:** Google Analytics (GA4)
- **Contact email:** kimberlyvanessagym@gmail.com
- **Repo:** https://github.com/kfr7/kim

---

## Design Direction

### Theme (confirmed March 25, 2026)
- **Dark site** — near-black background (#0A0A0A or similar)
- **Primary accent:** Purple — deep violet/purple as the brand color
- **Text:** White/light grey — NOT purple text (accent use only)
- **Colorblind accessible** — purple must have sufficient contrast; never rely on color alone to convey info (use icons + labels too)
- **Feel:** Premium, elevated, feminine but strong — NOT gym-bro, NOT pastel

### Colors
- Background: `#0A0A0A` (near-black)
- Primary accent: Deep purple `#7B2FBE` or `#6B21A8`
- Secondary: Soft lavender for hover states `#A855F7`
- Text: `#F5F5F5` (white) and `#A1A1AA` (grey for secondary)
- Surface/card: `#141414` or `#1A1A2E`

### Typography
- **Headlines:** Bold serif (Playfair Display) — premium feel
- **Body:** Clean sans-serif (Inter)
- **Accent:** Uppercase tracking for labels

### Photography Style
- High contrast, moody gym shots
- Confident poses
- Mix of gym + lifestyle
- Consistent cool/dark tone filter

---

## Logo
- **Active logo:** `logos/kv-logo-v1.jpg` — KV monogram + infinity symbol + dumbbells, purple/pink gradient ✅
- **Favicon:** Use KV logo as browser tab icon (favicon.ico + apple-touch-icon.png)
- Need 2 more variations (will generate manually on Recraft and commit)
- Kian to review all 3 and pick final direction with Kim

---

## Copy (Bio & Tagline)

### Tagline (hero section)
> **Built different. Entrenada con propósito.**
> *(Built different. Trained with purpose.)*

Alternatives:
- "Glutes, grind, and good vibes."
- "From the beginning. Every rep. Still going."
- "No shortcuts. Solo disciplina."

### Bio (About / Her Story)
> I'm Kim — LA-based, Latina, and obsessed with what the body is capable of.
>
> It started in 2020 with zero experience and a lot of heart. No trainer, no plan — just showing up. Over the years I built strength, confidence, and a community of women who actually want to see real results.
>
> My thing is glutes and legs. Heavy, intentional, consistent. If you're here for the transformation — física y mental — you're in the right place.
>
> *Follow along. Let's build.*

### Short bio (Work With Me / brand page)
> Kim Montepeque is a Latina fitness creator based in Los Angeles, CA. She specializes in glute and leg training and has been documenting her strength journey since 2020. Her audience is women 18–35 who are serious about building strength and looking for real, relatable content — not filters and fads.

## Photos
- `photos/kim-2020-gym.jpg` — 2020 starting photo (journey beginning)
- `photos/kim-gym-mirror-red-shorts.jpg` — mirror selfie, red shorts, headphones
- `photos/kim-bathroom-pink-leggings.jpg` — side profile, pink leggings, cream top
- `photos/kim-planetfitness-white-leggings.jpg` — white leggings, black sports bra, abs
- `photos/kim-back-tattoo-pulldown.jpg` — back tattoo + lat pulldown action shot
- `photos/kim-locker-room-converse.jpg` — side profile, grey shorts, Converse
- `photos/kim-locker-room-glutes-teal.jpg` — teal sports bra, grey leggings, glutes focus

---

## Site Sections

### 1. Hero
- Full-bleed photo or video loop
- Name + tagline
- CTAs: **Follow on Instagram** | **Work With Me**

### 2. Her Story (Journey)
- 2020 → now transformation narrative — raw, personal
- Use `photos/kim-2018-beginning.jpg` as the "beginning" anchor (2018, not 2020)
- Add recent photos to contrast the growth
- Short bio in her words (still needed from Kim)

### 3. What She Does / Niche
- Glutes & legs specialist
- Training philosophy
- Who she's for

### 4. Instagram Feed
- Latest Instagram posts (embed or oEmbed)

### TikTok Section — DEFERRED to Phase 2
- Hand-picked video grid (4-6 best videos, oEmbed)
- Waiting for higher quality content before adding
- Kian will supply video links when ready

**Videos confirmed so far:**
- https://www.tiktok.com/@kim.montepeque/video/7500278697501527338
- https://www.tiktok.com/@kim.montepeque/video/7466543043898920235
- https://www.tiktok.com/@kim.montepeque/video/7615001525147979038

### 5. Work With Me (Brand Sponsor Page)
- Follower count, engagement rate, niche
- Content types
- Past collabs (add as they grow)
- Inquiry form → email

### 6. My Workouts — Dedicated Page (`/workouts`)
- Tabbed layout at the top — one tab per training day in split order:
  1. Glutes
  2. Pull
  3. Legs with Glutes
  4. Push
  5. Pull *(cycle restarts)*
- Each tab shows exercises, order, and brief notes for that day
- Cardio section at the bottom of the page (separate from tabs):
  - Done at the end of every other training day
  - Options rotated: StairMaster (~20 min), 2-mile run, or stationary bike (~20 min)
  - Framed as optional but consistent — part of the overall routine

### 6b. My Diet — Dedicated Page (`/diet`)
- Daily meal structure: Breakfast, Lunch, Dinner
- General nutrition principles
- **Recovery Callout Block** at the bottom of the page — styled as a highlighted note/card:
  - Nutrition is part of recovery, not just performance
  - Jacuzzi sessions for active recovery and muscle relaxation
  - Sleep as a non-negotiable pillar of progress
  - The message: recovery (food, rest, sleep, water) is as important as the workout itself

### 7. What I Would Do If I Started Over — Dedicated Page (`/start-over`)
- Personal advice page — raw, honest, from Kim's perspective
- Great for SEO and relatability; speaks directly to beginners
- Full content below in the Training & Nutrition section of this plan

### 7a. Programs / Resources (Phase 2)
- Placeholder + email capture

### 8. Shop / Favorites — DEFERRED to Phase 2
- Amazon affiliate links (no account yet)
- Dfyne affiliate links (no account yet)
- Supplement codes
- Gym gear picks
- Will add once affiliate accounts are set up

### 9. Email Signup
- Inline section in the page (footer area or dedicated section)
- **No popup on page load** — purely opt-in, user scrolls to it
- Single field: email + "Join" button
- Copy: "Join the journey" or similar — low pressure
- Provider: Resend (free tier, simple API) or Mailchimp
- Phase 2: can add popup/exit-intent when list is more established

### 10. Privacy Policy & Terms of Service
- `/privacy` — required for email collection (GDPR/CCPA) and brand deals
- `/terms` — required by most brand contracts
- Boilerplate pages, auto-generated with Kim's name/email
- Linked in footer — nobody reads them but brands and App Store reviewers check

### 11. Footer
- IG, TikTok, email
- Brand inquiry CTA
- Links: Privacy Policy | Terms of Service

---

## Assets Still Needed From Kim
- [ ] Short bio in her own words
- [ ] Any brands she already works with
- [ ] Tagline / how she describes herself
- [x] Domain: kimberlyvanessa.com (purchased on Vercel)

## Assets In Hand
- [x] `photos/kim-hero-back-dfyne.jpg` — **HERO IMAGE** — back shot, red sports bra, Dfyne leggings, headphones, gym floor, back tattoo visible ✅
- [x] `photos/kim-2018-beginning.jpg` — **2018 starting point** — mirror selfie, black biker shorts + tank, Converse, gym with wood floors (for Her Story section) ✅
- [x] `logos/kv-logo-v1.jpg` — first logo direction

---

## Accessibility
- All purple accent elements must meet WCAG AA contrast (4.5:1 for text, 3:1 for UI)
- Never use color alone to indicate state — always pair with icon or label
- Test with grayscale filter before launch

---

## Monetization Path
| Phase | Followers | Revenue |
|-------|-----------|---------|
| Now | 2k | Micro-brand deals (affiliate links pending account setup) |
| Phase 2 | 5k | Paid posts ($200-500), PDF workout plan |
| Phase 3 | 10k+ | Brand retainers, coaching, merch |

---

---

## Training & Nutrition Overview

This training and nutrition approach is built around consistency, physique development, strength progression, and sustainable habits. The goal is to create a system that supports visible results while remaining realistic enough to maintain over time. Rather than promoting extreme restriction or unrealistic standards, this approach focuses on structured training, balanced meals, progressive overload, and self-discipline.

The overall framework combines a repeatable high-protein nutrition structure with a glute-focused and upper-body-balanced training split. The intention is to help individuals build strength, improve body composition, and develop confidence through consistency.

A key part of this philosophy is individual progression. Specific training weights are intentionally not listed, because every person should track their own numbers, compete with their previous performance, and measure progress against themselves. The purpose is to encourage self-awareness, personal accountability, and long-term growth rather than comparison to someone else's exact lifts.

---

## Nutrition Philosophy

Nutrition should be simple, balanced, and repeatable. Meals should prioritize protein, quality carbohydrates, healthy fats, fruit, and vegetables. The purpose is to support energy, recovery, muscle growth, and overall wellness without making food feel overly complicated.

This is not meant to be a restrictive meal plan, but rather a clean daily structure that can be followed consistently and adjusted depending on personal goals.

---

## Sample Daily Diet Structure

### Breakfast
Breakfast should provide a strong start to the day with protein, light carbohydrates, and nutrient-dense foods. A typical breakfast may include:
- 2 eggs
- Tea
- Fruit
- Protein pancakes

This meal structure provides a balanced combination of protein, fiber, and energy to start the day well.

### Lunch
Lunch should be centered around a primary protein source, a carbohydrate source for energy, and vegetables for balance and nutrition. A typical lunch may include:
- Salmon, chicken, or beef
- Sweet potatoes, rice, or pasta
- Vegetables

This meal is designed to support training performance, recovery, and satiety throughout the day.

### Dinner
Dinner should follow a similar structure to lunch, but usually with a slightly smaller portion size depending on hunger, activity level, and overall daily intake. A typical dinner may include:
- Salmon, chicken, or beef
- Rice, sweet potatoes, or pasta
- Vegetables
- Slightly smaller portions than lunch

This keeps dinner balanced and satisfying while still aligning with overall physique and recovery goals.

### General Nutrition Principles
- Prioritize protein at each meal
- Include carbohydrates to support energy and training performance
- Include vegetables and fruit daily
- Keep meals simple and repeatable
- Focus on consistency over perfection
- Adjust portions based on personal goals, activity level, and progress

---

## Training Split

The training split follows a glute-focused and upper-body-balanced rotation with one rest day per week. This structure allows for strong lower-body emphasis while still maintaining balanced upper-body development and recovery.

### Weekly Rotation
1. Glutes
2. Pull
3. Legs with glute focus
4. Push
5. Pull
6. Glutes
7. Rest

This rotation can be repeated continuously, with the rest day placed where recovery is most needed if scheduling needs to be adjusted.

---

## Glute Day

Glute day is focused on glute development, lower-body strength, and shaping. The session typically begins with the strongest glute-dominant movement and then progresses through unilateral work, hinge patterns, and accessory movements.

### Typical Exercise Order
1. Hip thrusts
2. Bulgarian split squats
3. Romanian deadlifts
4. Adductor machine
5. Abductor machine
6. Calf raises

Hip thrusts are typically performed first to prioritize glute engagement and strength output early in the session. Bulgarian split squats add unilateral work and stability. Romanian deadlifts help target the posterior chain with strong glute and hamstring involvement. The adductor machine targets the inner thigh area, while the abductor machine targets the outer glutes. Calves are also included to create a more complete lower-body session.

---

## Pull Day

Pull day focuses on the back, rear shoulder support, posture, and upper-body pulling strength. It also includes a short abdominal circuit.

### Typical Exercise Order
1. Lat pulldowns
2. Rows
3. Face pulls with rope (occasionally, not every pull day)
4. 6-minute ab circuit

The main focus of pull day is building the back through vertical and horizontal pulling patterns. Face pulls may be included periodically to target rear delts and upper back support.

### Ab Circuit
The ab workout is typically performed in intervals of 45 seconds on and 15 seconds off. The circuit lasts approximately 6 minutes and includes:
- Scissors
- Upper ab crunches
- Leg and chest lifts
- Side oblique crunches

The leg and chest lift movement involves raising both the legs and upper body toward the center. The oblique movement is performed from the side to target the waistline and side core musculature.

---

## Legs with Glute Focus

This day is still glute-involved, but places more emphasis on overall leg development. It combines glute activation with heavier compound leg work and accessory isolation movements.

### Typical Exercise Order
1. Hip thrusts
2. Squats
3. Leg extensions
4. Lying hamstring curls
5. Calf raises

Hip thrusts may still be used at the beginning of the session to activate the glutes before moving into more leg-dominant compound work. Squats provide full lower-body stimulus, while leg extensions emphasize the quads. Lying hamstring curls target the hamstrings, and calves are included to round out the session.

---

## Push Day

Push day is focused on chest, shoulders, and triceps, with a structure that combines machine-based pressing, chest isolation, and shoulder accessory work.

### Typical Exercise Order
1. Push machine
2. Fly machine
3. Incline chest press (every other push day)
4. Tricep pushdowns
5. Dumbbell lateral raises
6. Dumbbell front raises (occasionally)

The push machine and fly machine form the base of the session. Incline chest work is rotated in every other push day for variation and upper chest emphasis. Tricep pushdowns help support arm development, while lateral raises build shoulder width. Front raises may be added occasionally depending on the session.

---

## Progressive Overload Philosophy

Weights are intentionally not prescribed within this plan. The purpose is for each person to track their own lifts, record their own performance, and work toward improving over time based on their individual starting point.

This approach reinforces the idea that progress should be measured against your past self, not against someone else's numbers. Followers are encouraged to:
- Track their weights
- Record reps and sets
- Take notes during workouts
- Focus on gradual progression
- Compete with their previous performance

Strength and physique progress come from consistency, effort, and measurable improvement over time.

Individual weights are left open intentionally so each person can track their own progress, build confidence through personal improvement, and stay focused on long-term development.

---

## Core Training Principles

- Focus on proper form before increasing weight
- Use progressive overload consistently
- Track personal weights and performance
- Prioritize recovery and rest
- Stay consistent with both training and nutrition
- Build results through discipline, patience, and repetition

---

## What I Would Do If I Started Over

If I had to start my fitness journey over again, I would make things much simpler from the beginning. I would stop chasing perfect routines, random trends, and unrealistic expectations, and I would focus on doing the basics well for a long enough period of time to actually see progress.

The first thing I would do is focus on form before trying to lift heavy. A lot of people rush into increasing weight too quickly, but if your form is not solid, you are not getting the full benefit of the exercise. Before worrying about how heavy the weight is, I would focus on learning the movement correctly, controlling the tempo, and understanding exactly what muscle I am trying to target.

I would make sure to build a real mind-muscle connection first. That means learning how to actually feel the muscle working during each exercise rather than just moving weight from one point to another. Especially for glute and leg training, this matters a lot. If you cannot feel the glutes working, adding more weight is not always the answer. In many cases, the better approach is to reduce the weight, clean up the form, slow down the movement, and build better control first.

I would also remind myself that lifting heavier is only useful once the basics are already in place. Progressive overload matters, but it works best when it is built on proper mechanics. Lightweight with perfect form is more valuable than heavier weight with poor control. Once the movement is stable, the muscle is being properly targeted, and the technique is consistent, then it makes sense to gradually push the weight forward.

If I had to start over, I would also stop changing my routine too often. I would choose a structured split, stay consistent, and give the plan enough time to work. I would track my workouts, record my lifts, and focus on improving my own performance over time instead of comparing myself to other people.

With nutrition, I would keep things simple and repeatable. I would focus on protein, balanced meals, and consistency rather than trying to eat perfectly all the time. Results come from doing the fundamentals consistently, not from being extreme for a short period of time.

Most importantly, I would be more patient. Real progress takes time. Strength, confidence, body composition, and visible development all come from repeated effort over weeks and months, not from trying to rush the process.

### If I Were Starting Over, My Priorities Would Be:
- Learn proper form first
- Build a mind-muscle connection
- Use lighter weight until technique is solid
- Progressively overload once the basics are in place
- Stay consistent with a structured split
- Track workouts and improvements
- Keep nutrition simple and repeatable
- Compete with my past self, not other people

---

## Summary

This system is designed to be effective, sustainable, and easy to follow. Nutrition is built around simple high-protein meals with balanced carbohydrates and vegetables. Training is centered around a glute-focused split with balanced upper-body work and one weekly rest day.

---

## SEO & Technical Requirements (v1)

### Open Graph / Social Meta Tags
- Every page needs proper OG tags so link previews look professional when shared on IG, iMessage, Discord, etc.
- Required tags: `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`
- OG image: use a branded static image (KV logo on dark background with tagline) — 1200x630px
- Each page should have a unique title + description

### Favicon & Icons
- `favicon.ico` — KV logo, shown in browser tab
- `apple-touch-icon.png` (180x180) — shown when saved to iPhone home screen
- Generated from `logos/kv-logo-v1.jpg`

### Google Analytics
- GA4 property — connect to kimberlyvanessa.com
- Embed GA script via Next.js Script component (not in _document directly)
- Track pageviews, session duration, traffic source minimum

### robots.txt + Sitemap
- `robots.txt` — allow all crawlers, point to sitemap
- `sitemap.xml` — auto-generated, lists all public pages
- Use `next-sitemap` package for automatic generation on build

### 404 Page
- Branded, on-theme (dark background, purple accent)
- Animated dumbbell that rolls/bounces away
- Copy: something like "Looks like this page skipped leg day." (EN) / "Parece que esta página se saltó el día de piernas." (ES)
- CTA back to homepage

### Spanish Translations
- Translated by Claude Code as a native Guatemalan Spanish speaker — no review needed before launch
- Kim can flag corrections over time
- All locale keys in `locales/es/` shipped complete at launch

---

## Language Toggle (v1 Feature)

- **EN / ES toggle** — native site feature, not relying on browser translation plugins
- Toggle button visible in the navbar or header on every page
- Language preference stored in a cookie so it persists across refreshes and sessions
- Default language: **English**
- All site content (hero, bio, workouts, diet, "start over" page, nav, CTAs) needs Spanish translation
- Implementation: `next-intl` or `i18next` with a locale context provider; cookie read on load to set initial locale
- Cookie name: `kim_lang` (or similar), value: `en` or `es`
- No URL-based locale switching (e.g. `/es/workouts`) — single URL, client-side language swap

### Content to Translate (all pages)
- Navigation
- Hero section (tagline, CTAs)
- Her Story / bio
- Workouts page (exercise names, descriptions, cardio section)
- Diet page (meal structure, nutrition principles, recovery callout)
- "What I Would Do If I Started Over" page
- Work With Me page
- Email signup copy
- Footer

### Translation Status
- [ ] English content — in progress
- [ ] Spanish translation — pending (will need to be written or translated once English is finalized)

---

## Nice to Have (Phase 2)
- Dark/light mode (dark is default)
- Blog/journal section
- Booking for 1-on-1 coaching
- Newsletter with workout tips
