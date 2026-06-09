# Dmitrii — Premium Esoteric Expert Website 2026

> Status: approved direction after strategy discussion.
> Purpose: this document replaces the first draft as the working creative and technical specification for the website.
> Core idea: a premium, human, trustworthy, SEO-ready and AI-search-ready static website for Dmitrii. Not a loud "magic landing page", not a cheap mystical template, but a cinematic private consultation experience.

---

## 1. Project Essence

**Project name:** Dmitrii — таролог і езотеричний консультант.

**Website type:** static multi-page premium website with high-end motion design, strong trust positioning, bilingual content and conversion-oriented contact flows.

**Primary goal:** convert warm and cold traffic from Google Ads, organic search, direct referrals and AI search engines into Telegram / Viber / WhatsApp conversations.

**Secondary goal:** build a durable personal brand around Dmitrii: real name, real face, stable contact number, calm expertise, no fear pressure, no exaggerated guarantees.

**Target audience:** adults looking for a private consultation about personal questions, relationships, life decisions or spiritual/esoteric support. Core geography: Ukraine and Ukrainian diaspora in Germany, Poland, Czech Republic, Italy, USA and Canada.

**Default language:** Ukrainian.

**Secondary language:** Russian via language switcher.

**Important tone principle:** the site must feel written and designed by a careful human expert, not generated from a generic AI template.

---

## 2. Positioning

The site must not communicate "strong scary magic", manipulation, miracle promises or urgency through fear.

The positioning is:

- Dmitrii works under his real name.
- Dmitrii shows his face.
- Dmitrii has more than 10 years of practice.
- Dmitrii does not disappear after payment.
- Dmitrii does not promise the impossible.
- Dmitrii starts with diagnosis and explanation.
- Dmitrii works calmly, confidentially and personally.

The site should feel like:

- a private consultation office at night;
- warm, cinematic and expensive;
- intelligent, not theatrical;
- intimate, not anonymous;
- mystical in atmosphere, but human in content;
- premium without looking like a template luxury landing page.

Avoid:

- aggressive occult symbols;
- cheap "witchcraft" visual cliches;
- horror, skulls, excessive candles, blood-red colors;
- fake countdowns;
- "100% result" claims;
- "return your loved one guaranteed" claims;
- copy that sounds like pressure on a vulnerable person.

---

## 3. Approved Stack

Use a static stack:

- HTML5
- CSS3
- Vanilla JavaScript ES6+
- GSAP + ScrollTrigger via CDN
- Lenis via CDN for smooth scrolling
- Swiper.js via CDN for reviews

No framework:

- no React;
- no Next.js;
- no Vue;
- no Svelte;
- no build step required.

Optional only if truly needed:

- Three.js for a specific premium background or particle effect.

Default decision: do not add Three.js in the first implementation unless the static/video/GSAP approach is not enough.

Reasoning: this stack gives excellent SEO, fast load, easy deployment, low technical risk and enough freedom for premium animation.

---

## 4. Visual Direction

### Creative Concept

**Private Ritual Office / Warm Cinematic Premium**

This is not a fantasy site. It is a premium personal expert website with a controlled mystical atmosphere.

Visual mood:

- deep warm night background;
- soft gold accents;
- warm skin tones;
- glass panels with restrained blur;
- slow cinematic movement;
- subtle living light;
- tactile cards;
- quiet confidence.

The visitor should feel:

- "I can trust this person";
- "this is not a scam template";
- "there is a real specialist here";
- "I can write without being pressured";
- "the site is expensive, but not cold".

### Color System

Use the original "Warm Night Premium" palette as a base, but avoid a one-note dark purple/gold template.

```css
:root {
  --bg-primary: #0f0d14;
  --bg-deep: #09080d;
  --bg-surface: #191420;
  --bg-elevated: #201927;
  --bg-glass: rgba(255, 255, 255, 0.045);

  --text-primary: #f2ede4;
  --text-secondary: #b8afa4;
  --text-muted: #756d66;

  --accent-gold: #c9a84c;
  --accent-soft-gold: #e0c878;
  --accent-amber: #e8a598;
  --accent-wine: #6e283c;
  --accent-purple: #6b4e8a;
  --accent-forest: #31483c;

  --border-soft: rgba(255, 255, 255, 0.09);
  --border-gold: rgba(201, 168, 76, 0.28);
  --glow-gold: rgba(201, 168, 76, 0.18);
  --glow-amber: rgba(232, 165, 152, 0.12);

  --error: #e57373;
  --success: #81c784;
}
```

Important: the site must not look dominated by only purple or only gold. Add warm neutral surfaces, muted wine, forest and amber details where appropriate.

### Typography

Use:

- `Cormorant Garamond` for display headings;
- `Lato` for body text.

The typography must feel editorial and readable, not decorative for its own sake.

Rules:

- large hero text only in hero and major CTA sections;
- compact headings inside cards;
- no negative letter spacing;
- no viewport-width font scaling;
- body text must be readable on mobile;
- line length should be controlled for trust and clarity.

---

## 5. Motion Direction

Motion must be premium and calm. It should make the site feel alive, not like an amusement park.

Approved motion style:

- slow cinematic reveal;
- text gently assembling into place;
- soft parallax layers;
- living aurora/video light;
- magnetic service cards;
- glass cards floating subtly;
- CTA glow breathing slowly;
- review carousel moving smoothly;
- FAQ opening naturally;
- counters counting only once.

Avoid:

- excessive bouncing;
- chaotic particles everywhere;
- loud confetti;
- constant spinning;
- aggressive glitch;
- animations that distract from reading;
- motion that makes the site feel like a demo reel.

### Hero Motion

The hero heading should not simply fade in. It should feel like it forms from attention:

- words or text fragments appear in sequence;
- slight blur resolves into sharp text;
- vertical movement is small;
- timing is slow enough to feel expensive.

Implementation:

- GSAP split by words;
- optional nested span fragments;
- respect `prefers-reduced-motion`.

### Background Motion

Preferred first version:

- a lightweight video background or image poster in hero;
- CSS aurora layer above or behind it;
- subtle gradient overlays for readability.

If no real video is available:

- use CSS aurora mesh;
- use premium placeholder stills;
- leave comments explaining where to replace assets with real WebP/WebM.

Video rules:

- use `poster`;
- use muted autoplay loop playsinline;
- preload metadata only;
- never hurt LCP;
- never make text unreadable.

### Magnetic Cards

Service and pricing cards may use:

- subtle cursor-follow tilt;
- light sweep on hover;
- icon micro-motion;
- gentle border glow.

Cards must remain readable and stable.

---

## 6. Site Architecture

Deliver static files:

```text
index.html
robots.txt
sitemap.xml
llms.txt
README.md

/posluhy/
  index.html
  taro.html
  stosunky.html
  pryvorot.html
  lyubovna-magiya.html
  ochyshchennia.html
  znyattia-porchi.html
  zakhyst.html
  hroshi-rishennia.html
  hroshova-magiya.html

/online-konsultatsiia/
  index.html

/vartist/
  index.html

/ads/
  index.html

/notatky/
  index.html

/ai/
  dmitrii-summary.md
  services.md
  faq.md

/geo/
  ukrayintsi-v-nimechchyni.html
  ukrayintsi-v-polshchi.html
  ukrayintsi-v-chekhii.html
  ukrayintsi-v-italii.html
  ukrayintsi-v-ssha.html
  ukrayintsi-v-kanadi.html

/pro-mene/
  index.html

/vidhuky/
  index.html

/faq/
  index.html

/kontakty/
  index.html

/polityka/
  index.html

/css/
  styles.css

/js/
  config.js
  main.js
  animations.js
  lang.js
  forms.js
  utils.js

/assets/
  /images/
    /master/
    /services/
    /reviews/
    /og/
    /backgrounds/
  /video/
  /icons/
```

### Config

Create `js/config.js` for values that may change later:

```js
window.DMITRII_CONFIG = {
  siteUrl: '',
  phone: '+380639646753',
  telegramUrl: 'https://t.me/dmitrii_master',
  viberUrl: '',
  whatsappUrl: '',
  formEndpoint: ''
};
```

The domain is unknown now. Build all canonical, sitemap and Open Graph values so they can be updated once the real domain is chosen.

### Two-Layer Service Strategy

The project must not hide Dmitrii's real services. People search directly for terms like "приворот", "зняти порчу", "любовна магія" and "грошова магія", and the website must be able to rank for those intents.

Use two layers:

1. **Public premium navigation layer**
   - "Стосунки"
   - "Очищення"
   - "Захист"
   - "Гроші та рішення"
   - "Таро"

2. **Direct SEO service layer**
   - `/posluhy/pryvorot.html`
   - `/posluhy/lyubovna-magiya.html`
   - `/posluhy/znyattia-porchi.html`
   - `/posluhy/hroshova-magiya.html`

The direct SEO pages are allowed to use the exact searched terms in H1, title, meta description, FAQ and body copy. They must not use manipulative guarantees, fear pressure or miracle promises.

The advertising-safe page must stay separate from direct SEO pages.

---

## 7. Pages

### Home Page

Home is the primary conversion page.

Required blocks:

1. Sticky header
2. Hero as a cinematic scene: Dmitrii portrait, name, honest positioning, primary CTA and soft trust microcopy
3. AI summary paragraph
4. "If you do not know where to start" diagnostic bridge
5. Trust counters
6. "How I work" trust behavior block
7. Services bento grid
8. About Dmitrii short block
9. Clarity before/after block: from anxiety and guesses to a clear explanation and possible next steps
10. How consultation works
11. Pricing / formats summary
12. Reviews carousel
13. FAQ preview
14. Gentle disclaimer
15. Final CTA
16. Footer

Hero formula:

- real portrait or strong premium placeholder;
- Dmitrii's name visible in the first viewport;
- one calm positioning line;
- one primary CTA: "Почати з діагностики";
- one secondary CTA: "Подивитися, як це працює";
- microcopy near CTA: "Перша коротка діагностика безкоштовна. Без тиску і без автоматичних розсилок."

Do not overload the hero with all counters, all services or excessive badges.

### Services Overview

Purpose: help visitors quickly identify the right direction.

Should include:

- short human intro;
- service cards;
- "not sure what to choose?" diagnostic CTA;
- FAQ preview.

### Individual Service Pages

Pages:

- Tarot consultation
- Personal relationships / love situation consultation
- Love spell / direct приворот SEO page
- Love magic SEO page
- Energy cleansing
- Curse / negative influence removal SEO page
- Protection
- Money and life decisions consultation
- Money magic SEO page

Each service page should include:

1. Service hero
2. Human explanation of the service
3. Who this service is for
4. What happens during diagnosis
5. How the work happens
6. Price guidance
7. Realistic expectation block
8. Related reviews
9. Service FAQ
10. Final CTA

Naming rules:

- Do not use "приворот" as a primary navigation label or Google Ads CTA.
- The safer public page name is "Стосунки" / "Робота з особистими стосунками" / "Діагностика стосунків".
- Direct SEO pages may use exact terms such as "приворот", "любовна магія", "зняти порчу", "грошова магія" in H1, title and FAQ.
- If SEO copy mentions "приворот", it must be contextual and careful: Dmitrii starts with diagnosis, explains what he sees and does not promise a guaranteed return of a person.
- If SEO copy mentions "зняти порчу" or "порча", it must avoid fear pressure. Do not tell the visitor they are definitely cursed.
- If SEO copy mentions "грошова магія", it must not promise income, profit, debt removal or financial outcome. Add that it is not financial advice.

### Direct SEO Service Pages

These pages exist because users search for exact terms. They are not the tone of the main hero or advertising-safe landing page.

#### `/posluhy/pryvorot.html`

SEO intent:

- приворот;
- приворот онлайн;
- сильний приворот;
- любовний приворот;
- повернути коханого;
- повернути кохану;
- приворот по фото.

Safe positioning:

- "Приворот: діагностика любовної ситуації"
- Explain that Dmitrii first diagnoses the situation.
- Explain that not every situation should continue into deeper work.
- Avoid "100%", "за 3 дні", "гарантовано", "поверну".
- CTA: "Описати свою ситуацію Дмитрію".

#### `/posluhy/lyubovna-magiya.html`

SEO intent:

- любовна магія;
- обряд на кохання;
- ритуал на любов;
- любовна прив'язка;
- магічна робота зі стосунками.

Safe positioning:

- "Любовна магія та робота зі стосунками"
- Keep the tone softer than the direct приворот page.
- Connect this page internally to `stosunky.html` and `pryvorot.html`.

#### `/posluhy/znyattia-porchi.html`

SEO intent:

- зняти порчу;
- снятие порчи;
- зняття негативу;
- енергетична чистка;
- захист від негативу;
- пристріт / сглаз.

Safe positioning:

- "Зняття порчі та негативу: спочатку діагностика"
- Do not assert that the visitor has a curse.
- Frame the first step as calm diagnosis.
- Connect to `ochyshchennia.html` and `zakhyst.html`.

#### `/posluhy/hroshova-magiya.html`

SEO intent:

- грошова магія;
- ритуал на гроші;
- обряд на гроші;
- залучення грошей;
- грошові сценарії.

Safe positioning:

- "Грошова магія та діагностика грошових сценаріїв"
- No income promises.
- No "urgent money" promises.
- Add clear note: this is not financial advice.
- Connect to `hroshi-rishennia.html`.

Important: individual service pages need full UA/RU copy. The original file did not include complete service-page copy, so new copy may be written, but it must follow the approved tone:

- warm;
- calm;
- specific;
- not manipulative;
- not AI-generic;
- no impossible promises.

### Online Consultation Page

Purpose: central SEO and conversion page for people searching for an online consultation.

URL: `/online-konsultatsiia/`

Must include:

- what online consultation is;
- how to write first;
- what to prepare;
- messenger options;
- how long the first reply may take;
- what the free short diagnosis includes;
- when paid work may be offered;
- confidentiality;
- FAQ;
- CTA to start with diagnosis.

### Pricing / Formats Page

Purpose: make the offer transparent and reduce distrust.

URL: `/vartist/`

Must include:

- free short diagnosis;
- tarot / consultation price range;
- deeper individual work after diagnosis only;
- no automatic payments;
- no payment before format and cost are explained;
- payment options;
- "not a guarantee of result" note.

### Advertising-Safe Landing Page

Purpose: a cleaner Google Ads landing page with lower moderation risk.

URL: `/ads/`

Rules:

- use "private consultation", "diagnosis", "relationships", "personal questions", "confidentiality";
- avoid "приворот", "порча", "срочно", "верну", "накажу", "закрою дорогу";
- no fear, no crisis exploitation, no miracle claims;
- strong trust and pricing transparency;
- soft CTA: "Почати з короткої діагностики".

### Notes / Articles

Purpose: build topical authority, organic traffic and AI-search visibility.

URL: `/notatky/`

Initial evergreen article topics:

- "Як проходить онлайн-консультація таролога"
- "Що можна питати на діагностиці"
- "Чому чесний спеціаліст не дає 100% гарантій"
- "Як відрізнити консультацію від маніпуляції страхом"
- "Що підготувати перед розкладом Таро"
- "Конфіденційність в онлайн-консультаціях"

### GEO Pages For Diaspora

Purpose: capture diaspora search intent and help AI systems understand geography.

Initial pages:

- Ukrainians in Germany
- Ukrainians in Poland
- Ukrainians in Czech Republic
- Ukrainians in Italy
- Ukrainians in USA
- Ukrainians in Canada

Rules:

- do not exploit war, trauma or refugee status;
- use neutral wording: "українська діаспора", "онлайн з будь-якої країни", "зручно, якщо ви живете за кордоном";
- focus on language, time zones, messenger communication and privacy.

### About Page

Purpose: build trust.

Must include:

- real-name positioning;
- 10+ years of practice;
- why Dmitrii does not promise impossible results;
- confidentiality;
- how he works online;
- stable phone/contact point;
- portrait-led layout.

### Reviews Page

Purpose: social proof without looking fake.

Rules:

- avoid over-polished review language;
- use short first names and cities;
- include chat screenshot placeholders;
- mention that screenshots should be anonymized;
- do not fabricate extreme miracle claims.

### FAQ Page

Purpose: reduce anxiety and answer objections.

Must include:

- all core FAQ items;
- FAQPage schema;
- questions that match real search intent;
- no legal or medical claims.

### Contacts Page

Purpose: conversion.

Must include:

- Telegram, Viber, WhatsApp;
- clickable phone;
- contact form;
- response expectation;
- privacy reassurance;
- short diagnostic CTA.

### Privacy Policy

Create a practical basic privacy page:

- what data is collected;
- why it is collected;
- how contact form data is used;
- confidentiality;
- third-party services;
- contact details;
- note that legal text can be replaced before launch.

---

## 8. Copywriting Rules

The copy must be human, specific and emotionally intelligent.

Write as if Dmitrii is a real person speaking calmly, not a landing page shouting.

Use:

- short paragraphs;
- concrete facts;
- natural Ukrainian as default;
- Russian as secondary;
- clear CTAs;
- soft reassurance;
- precise expectations.

Avoid:

- generic AI phrases;
- "in today's fast-paced world";
- "unlock your potential";
- "transform your life forever";
- "100% guarantee";
- "only today";
- "act now before it is too late";
- melodrama;
- manipulative fear.

Preferred phrases:

- "перша діагностика безкоштовна";
- "без тиску";
- "без порожніх обіцянок";
- "поясню, що бачу";
- "якщо вирішите продовжити";
- "працюю конфіденційно";
- "під власним іменем".

### Important Humanization Rule

The site should not read like it was generated by AI.

To achieve this:

- vary sentence length;
- include grounded details;
- avoid repeating the same structure;
- make each page have a slightly different rhythm;
- let some copy feel personal and direct;
- do not over-optimize every heading into a keyword phrase.
- repeated service-page paragraphs are forbidden;
- each service must have its own rhythm, examples and emotional texture;
- do not create universal copy where only the service name changes;
- reviews must sound like real short messages, not polished ad testimonials.

### Trust And Boundaries Copy

Add a recurring trust pattern across the website:

- "Я не обіцяю результат там, де його не бачу."
- "Спочатку дивлюся ситуацію і пояснюю, чи є сенс продовжувати."
- "Рішення завжди залишається за вами."
- "Я не працюю через страх або тиск."

Add a block "Коли я не беру роботу" on About, FAQ or Methods-related sections.

It should explain:

- Dmitrii does not work through fear;
- Dmitrii does not promise impossible results;
- Dmitrii does not replace medical, legal, psychological or financial professionals;
- Dmitrii does not publish correspondence or screenshots without consent;
- Dmitrii explains format and cost before paid work starts.

### CTA System

Do not use one CTA phrase everywhere.

Use CTA based on user temperature:

- cold visitor: "Почати з діагностики";
- warm visitor: "Запитати Дмитрія";
- service page visitor: "Описати свою ситуацію";
- final CTA: "Написати Дмитрію";
- mobile sticky CTA: Telegram / Viber / WhatsApp.

Microcopy near CTA:

- "Можна написати коротко, без довгих пояснень."
- "Відповідь особисто. Без автоматичних розсилок."
- "Перша коротка діагностика безкоштовна. Якщо потрібна глибша робота, формат і вартість пояснюються заздалегідь."

---

## 9. SEO, GEO And AI Search Foundation

The site must be optimized for:

- Google Search;
- Yandex where applicable;
- Google Ads landing-page quality;
- ChatGPT-style answer engines;
- Google Gemini;
- Claude;
- Perplexity;
- other LLM crawlers.

### Required Technical SEO

Every page must include:

- unique `<title>`;
- unique meta description;
- canonical URL placeholder;
- Open Graph tags;
- Twitter card tags;
- `meta robots="index, follow"`;
- one clear H1;
- logical H2/H3 structure;
- descriptive alt text;
- internal links;
- breadcrumbs where useful.

### Required Schema

Use JSON-LD:

- `Person` on home and about;
- `Service` on each service page;
- `Offer` inside service schema where a price range or "after diagnosis" pricing can be stated honestly;
- `FAQPage` on FAQ and service FAQs;
- `BreadcrumbList` on inner pages;
- `WebSite` on home;
- `Organization` only if later there is a business entity.
- `ProfessionalService` may be added later if the domain, business format and geographic identity are clear.

Do not add fake `AggregateRating` or `Review` schema unless there is a real review system and real review data.

### AI / LLM Discoverability

Add:

- `llms.txt`;
- `/ai/dmitrii-summary.md`;
- `/ai/services.md`;
- `/ai/faq.md`;
- a clear AI summary on the home page;
- a "Коротко для AI-пошуку" factual block on home, about, services and contacts;
- concise factual summaries on service pages;
- structured FAQ;
- plain-language descriptions of who Dmitrii is and what he offers.

`llms.txt` should summarize:

- site owner;
- services;
- geography;
- languages;
- contact channels;
- ethical positioning;
- main page URLs.

AI-readable summaries must avoid supernatural claims as factual guarantees.

Preferred factual wording:

"Dmitrii provides private tarot and esoteric consultations online. The site frames services as spiritual/esoteric support, does not guarantee outcomes, and encourages users to seek medical, legal, psychological or financial professionals when appropriate."

### Robots

`robots.txt` should allow normal search engines and AI crawlers unless later strategy changes.

Include:

```text
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: SITE_URL/sitemap.xml
```

Replace `SITE_URL` when domain is selected.

---

## 10. Google Ads And Compliance Sensitivity

This niche can be sensitive for ad systems. The website must be conversion-oriented but not reckless.

Landing page copy must avoid:

- guaranteed romantic results;
- "return a loved one" promises;
- claims of influencing another person's will;
- claims of supernatural certainty;
- fear-based pressure;
- exploiting war, grief or crisis;
- medical, legal or financial promises;
- claims that the user is cursed and must pay immediately.

Safer framing:

- consultation;
- diagnosis;
- situation analysis;
- relationship work;
- personal support;
- energy cleansing as a spiritual/esoteric service;
- transparent expectations;
- no guarantees;
- free first diagnosis.

Ad-focused pages should emphasize:

- trust;
- calm process;
- confidentiality;
- first contact;
- no pressure.

Mandatory human disclaimer:

"Езотеричні консультації не замінюють медичну, юридичну, психологічну або фінансову допомогу. Дмитрій не дає гарантій результату і не працює через страх чи тиск."

Pricing transparency rule:

"Перша коротка діагностика безкоштовна. Якщо потрібна глибша робота, Дмитрій заздалегідь пояснює формат і вартість."

Reviews must not contain miracle claims such as:

- returned partner in a fixed number of days;
- money appeared immediately after a ritual;
- doctors failed but Dmitrii solved it;
- guaranteed removal of damage or curse.

Safer review language:

- became calmer after the consultation;
- understood what was happening;
- Dmitrii explained without pressure;
- no impossible promises, but the situation became clearer.

---

## 11. Conversion System

Primary CTA:

- Telegram.

Secondary CTA:

- Viber.

Third CTA:

- WhatsApp for diaspora.

Floating CTA:

- bottom-right Telegram button;
- soft pulse;
- accessible label;
- not visually aggressive.

Contact form:

- name;
- phone or messenger;
- question;
- data consent checkbox;
- client-side validation;
- configurable endpoint in `config.js`;
- success modal in current language.

CTA language should be direct and soft:

- "Написати в Telegram";
- "Отримати безкоштовну діагностику";
- "Запитати Дмитрія";
- "Почати з діагностики".

Avoid:

- "Замовити приворот зараз";
- "Повернути коханого сьогодні";
- "Терміново";
- "Не втрачайте шанс".

### Keyword Layering For Ads And SEO

Do not treat all keywords the same.

Use this structure:

1. **Google Ads safe core**
   - таролог онлайн;
   - консультація таролога;
   - розклад таро онлайн;
   - діагностика ситуації;
   - консультація щодо стосунків;
   - езотерична консультація;
   - онлайн консультація українською;
   - конфіденційна консультація;
   - перша діагностика безкоштовна.

2. **SEO direct service layer**
   - приворот;
   - приворот онлайн;
   - любовний приворот;
   - любовна магія;
   - зняти порчу;
   - снятие порчи;
   - зняття негативу;
   - грошова магія;
   - ритуал на гроші;
   - обряд на гроші;
   - захист від негативу.

3. **Article / FAQ layer**
   - чи можна зробити приворот онлайн;
   - що потрібно для діагностики;
   - як зрозуміти чи є негатив;
   - чому не можна гарантувати результат;
   - що підготувати перед консультацією таролога;
   - як проходить онлайн-консультація.

4. **Avoid in ads, use only with care in SEO context**
   - сильний приворот 100%;
   - поверну за 3 дні;
   - навести порчу;
   - порча на смерть;
   - термінові гроші;
   - заговор від алкоголізму;
   - гарантований результат.

---

## 12. Accessibility And Performance

Requirements:

- responsive from 320px to 1920px;
- no layout shift from images;
- all images use explicit width and height;
- below-fold images lazy-loaded;
- video has poster and does not block LCP;
- all interactive elements keyboard accessible;
- visible focus styles;
- FAQ uses `aria-expanded` and `aria-controls`;
- mobile menu uses proper aria attributes;
- language switcher uses `aria-pressed`;
- animations respect `prefers-reduced-motion`;
- text contrast passes common accessibility standards.

Performance goals:

- LCP under 2.5s where possible;
- CLS under 0.1;
- mobile PageSpeed target above 70;
- no heavy libraries beyond approved stack;
- no uncompressed large background video.

---

## 13. Image And Video Assets

Use placeholders in the first implementation, but structure the project for real premium assets.

Required assets:

- Dmitrii hero portrait, 800x1000 WebP;
- Dmitrii about portrait, 600x700 WebP;
- service images or abstract tactile details, 600x400 WebP;
- anonymized review screenshots, 300x400 WebP;
- Open Graph image, 1200x630 WebP;
- hero video WebM/MP4 optional;
- poster image for hero video.

Asset direction:

- warm light;
- real person;
- hands, cards, table, texture, soft shadows;
- not stocky;
- no exaggerated occult props;
- no unreadable dark images.

Expert art-direction rules:

- Dmitrii's face is the main premium asset of the site.
- Hero should feel like a scene, not a generic landing-page split layout.
- Video background is "light and breathing", not a busy story.
- Avoid pentagrams, skulls, aggressive runes and horror-coded objects.
- Use gold as a jewelry accent, not as a dominant fill.
- Use glass sparingly; mix matte dark surfaces, fine borders and soft inner light.
- Give each service a subtle visual motif, not just a different icon.
- Keep "wow" moments to 2-3 places: hero reveal, service card hover and one scroll transition.

---

## 14. Language Switcher

Use `data-ua` and `data-ru` attributes for visible copy where practical.

For longer page copy, use either:

- `data-ua` / `data-ru` on blocks, or
- language-specific templates in JS if maintainability becomes better.

Language must persist in `localStorage`.

The `<html lang="">` attribute must update:

- Ukrainian: `uk`;
- Russian: `ru`.

Also update:

- active language button;
- `aria-pressed`;
- form messages;
- modal text;
- image alt text where needed.

---

## 15. Acceptance Criteria

The implementation is acceptable when:

- all listed pages exist;
- every page opens without a build step;
- language switching works and persists;
- the site looks premium, calm and human;
- hero has cinematic movement or a strong placeholder prepared for video;
- animations are visible but not distracting;
- service cards feel tactile and high-end;
- SEO meta exists on every page;
- JSON-LD exists where required;
- `robots.txt`, `sitemap.xml` and `llms.txt` exist;
- contact values are centralized or easy to replace;
- mobile layout is polished;
- no text overlaps on small screens;
- PageSpeed is not sacrificed for effects;
- copy avoids manipulative promises and generic AI wording.
- "приворот" is not used as a primary navigation label or Google Ads CTA, while direct SEO pages may use it in H1/title;
- free diagnosis is explained transparently;
- every CTA has appropriate microcopy where useful;
- the disclaimer is present in a human tone;
- the website has AI-readable summary files;
- service pages do not reuse generic paragraphs with only the title changed.

### SEO Release QA Checklist

Before launch:

- verify all unique titles and meta descriptions;
- verify canonical URLs after the real domain is chosen;
- submit sitemap to Google Search Console;
- submit sitemap to Yandex Webmaster;
- validate `robots.txt`;
- validate JSON-LD with Google Rich Results Test where applicable;
- validate structured data with Yandex tools where applicable;
- test PageSpeed mobile;
- check Open Graph image;
- verify `llms.txt` and `/ai/*.md` files are accessible;
- check mobile sticky CTA behavior;
- check all messenger links and phone links.

---

## 16. Implementation Approach

Build in phases:

1. Static architecture, shared header/footer and base CSS.
2. Home page with final visual direction.
3. Language switching and config.
4. Animations and interactions.
5. Service pages.
6. FAQ, contacts, privacy.
7. SEO, schema, sitemap, robots, llms.
8. Responsive QA.
9. Browser verification.
10. Final polish.

During implementation, prioritize:

- trust before spectacle;
- clarity before decoration;
- performance before excessive animation;
- human copy before keyword stuffing;
- conversion before visual noise.

---

## 17. Independent Expert Review Decisions

Four independent review angles were considered before implementation:

- SEO / GEO / LLM discoverability;
- UX and conversion strategy;
- art direction and motion design;
- Google Ads, policy and trust risk.

Accepted decisions:

1. Dmitrii's real face and name are the primary trust asset.
2. The hero must be a quiet cinematic scene, not a decorative template.
3. "Приворот" and other direct magical-service terms are kept as SEO pages because users search for them directly.
4. "Приворот" must not be the main advertising face of the site; ads and top-level navigation frame the first step as diagnosis and consultation.
5. Money-related services must not promise income, profit or financial outcomes.
6. The first conversion step is a short free diagnosis, explained transparently.
7. Add a separate online consultation page as a key SEO and conversion page.
8. Add a separate pricing / formats page for trust and ad safety.
9. Add an advertising-safe landing page for Google Ads traffic.
10. Add notes/articles and GEO pages as growth architecture.
11. Add AI-readable Markdown summaries in addition to `llms.txt`.
12. Add a "when I do not take work" trust block.
13. Keep motion restrained, slow and premium.
14. Avoid miracle claims in reviews and schema.
15. Use service-specific copy, not generic repeated AI text.
16. Before implementation, treat this document as the source of truth over the first draft.

---

## 18. Final Creative Rule

This website should not feel like "AI made a mystic landing page".

It should feel like a careful designer, SEO strategist and senior frontend developer sat with Dmitrii, understood the person behind the service and built a premium digital presence around trust.

The user should not think:

"This is a template."

The user should think:

"Here is a real person. I can write to him."
