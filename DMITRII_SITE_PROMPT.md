# Dmitrii — Esoteric Master Website · Technical Specification (AI-ready)

> **Superseded working note:** this first draft is preserved as source material. The current approved direction for design, SEO/GEO, motion, tone and implementation is documented in `DMITRII_SITE_PROMPT_PREMIUM_2026.md`.

> **Goal:** produce a clear, AI-friendly technical specification describing a multi-page static website. All visible UI copy on the site must be in **Ukrainian** (primary) with a language switcher to **Russian** (all copy provided in this spec). The deliverable is a ready-to-implement spec that a frontend developer or an LLM can use to generate HTML/CSS/JS assets.

---

## 1. Project Overview

**Project name:** Dmitrii — Парапсихолог. Таролог. Маг.

**What to build:** a responsive, premium, animated multi-page website for Dmitrii — an esoteric master with 10+ years of practice. The site presents the master, his services (tarot, love magic, energy cleansing, protection, money magic), pricing, reviews, FAQ, and a contact/lead capture form.

**Key positioning:** Dmitrii is NOT a generic online "wizard". He works under his real name, shows his face, has never changed his number in 10 years. The site must communicate trust, professionalism, and a warm human touch — not fear, not mystical pressure.

**Language requirements:**
- Specification (this document): **English**
- Primary site language: **Ukrainian** (default)
- Secondary language: **Russian** (switchable via UA/RU toggle in header)
- All copy for both languages is provided in Section 6

**Target audience:** Women 25–55 in difficult life situations (relationships, love, family). Geography: Ukraine + Ukrainian diaspora (Germany, Poland, Czech Republic, Italy, USA, Canada).

**CTA channels:** Telegram + Viber (primary), WhatsApp (secondary, for diaspora).

---

## 2. Deliverables

- `index.html` — main landing (home)
- `posluhy/index.html` — services overview page
- `posluhy/taro.html` — tarot consultation page
- `posluhy/pryvorot.html` — love magic page
- `posluhy/ochyshchennia.html` — energy cleansing page
- `posluhy/zakhyst.html` — protection page
- `posluhy/hroshi.html` — money magic page
- `pro-mene/index.html` — about Dmitrii page
- `vidhuky/index.html` — reviews page
- `faq/index.html` — FAQ page
- `kontakty/index.html` — contacts page
- `polityka/index.html` — privacy policy page
- `css/styles.css` — all styles with CSS variables
- `js/main.js` — entry point
- `js/animations.js` — all scroll and entrance animations
- `js/lang.js` — language switcher (UA/RU)
- `js/forms.js` — form validation and submission
- `js/utils.js` — helpers (counter animation, smooth scroll)
- `assets/images/` — placeholder images with correct dimensions and alt texts
- `assets/icons/` — SVG icons
- `robots.txt` — open for all bots including GPTBot, ClaudeBot, PerplexityBot
- `sitemap.xml` — all pages listed
- `README.md` — instructions for local run and Vercel deploy

---

## 3. Technology & Libraries

**Base stack:** HTML5, CSS3, Vanilla JavaScript (ES6+).

**Allowed helper libraries (load via CDN):**
- Animations & scroll: **GSAP (with ScrollTrigger)**
- Smooth scroll: **Lenis**
- Carousel / sliders: **Swiper.js** (for reviews block)
- Aurora background: CSS-only animated gradient (no library needed)

**Not allowed:** React / Next.js / Vue / Svelte or any SPA framework. The site must be static, deployable to Vercel by dropping files, openable via `index.html`.

**Performance constraints:**
- All images: WebP format, explicit `width` and `height` attributes
- Lazy loading on all images below the fold: `loading="lazy"`
- All animations must respect `prefers-reduced-motion`
- Target: LCP < 2.5s, CLS < 0.1 on mobile
- Google Fonts loaded with `display=swap`

---

## 4. Visual Identity — "Warm Night Premium"

### Concept
Not a typical dark mystic site. Not a plain light therapist site. A deep warm dark background with living aurora gradients in gold and amber tones. Glassmorphism 2.0 for cards. Feels premium, trustworthy, and slightly mysterious — like a high-end private consultation office at night.

### CSS Variables

```css
:root {
  /* Backgrounds */
  --bg-primary:     #0F0D14;   /* deep warm dark — main page background */
  --bg-surface:     #1A1525;   /* card / section backgrounds */
  --bg-glass:       rgba(255, 255, 255, 0.04); /* glassmorphism cards */

  /* Aurora gradient orbs (animated in Hero) */
  --aurora-gold:    #C9A84C;
  --aurora-amber:   #E8A598;
  --aurora-purple:  #6B4E8A;

  /* Text */
  --text-primary:   #F2EDE4;   /* warm cream — main text */
  --text-secondary: #A89F94;   /* warm grey — secondary text */
  --text-muted:     #6B6560;   /* muted — captions, labels */

  /* Accents */
  --accent-gold:    #C9A84C;   /* primary CTA, headings accent */
  --accent-glow:    rgba(201, 168, 76, 0.15); /* gold glow for cards */
  --accent-border:  rgba(201, 168, 76, 0.2);  /* card borders */

  /* Functional */
  --white:          #FFFFFF;
  --error:          #E57373;
  --success:        #81C784;

  /* Spacing scale */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  40px;
  --space-2xl: 64px;
  --space-3xl: 96px;

  /* Border radius */
  --radius-sm:  8px;
  --radius-md:  16px;
  --radius-lg:  24px;
  --radius-xl:  32px;

  /* Glass effect */
  --glass-bg:     rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur:   backdrop-filter: blur(20px);
}
```

### Typography

```css
/* Load in <head> */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');

:root {
  --font-display: 'Cormorant Garamond', Georgia, serif; /* headings — elegant, luxury */
  --font-body:    'Lato', sans-serif;                   /* body — clean, readable */

  --text-hero:    clamp(42px, 6vw, 80px);
  --text-h1:      clamp(32px, 4vw, 56px);
  --text-h2:      clamp(26px, 3vw, 40px);
  --text-h3:      clamp(20px, 2.5vw, 28px);
  --text-body:    16px;
  --text-small:   14px;
  --text-caption: 12px;

  --leading-tight:  1.2;
  --leading-normal: 1.6;
  --leading-loose:  1.8;
}
```

### Aurora Background (Hero & key sections)

Implement as CSS-only animated mesh gradient. Place 3 large blurred orbs behind content:
```css
.aurora-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}
.aurora-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.25;
  animation: aurora-drift 12s ease-in-out infinite alternate;
}
.aurora-orb-1 { width: 600px; height: 600px; background: var(--aurora-gold);   top: -200px; left: -100px; animation-delay: 0s; }
.aurora-orb-2 { width: 500px; height: 500px; background: var(--aurora-purple); top: 100px;  right: -150px; animation-delay: -4s; }
.aurora-orb-3 { width: 400px; height: 400px; background: var(--aurora-amber);  bottom: -100px; left: 40%; animation-delay: -8s; }

@keyframes aurora-drift {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(40px, 30px) scale(1.1); }
}
```

### Glassmorphism Cards

All service cards, pricing cards, review cards use this pattern:
```css
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: var(--radius-lg);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.glass-card:hover {
  border-color: var(--accent-border);
  box-shadow: 0 0 40px var(--accent-glow);
}
```

---

## 5. File & Folder Structure

```
/dmitrii-site
  index.html
  robots.txt
  sitemap.xml
  /posluhy
    index.html
    taro.html
    pryvorot.html
    ochyshchennia.html
    zakhyst.html
    hroshi.html
  /pro-mene
    index.html
  /vidhuky
    index.html
  /faq
    index.html
  /kontakty
    index.html
  /polityka
    index.html
  /css
    styles.css
  /js
    main.js
    animations.js
    lang.js
    forms.js
    utils.js
  /assets
    /images
      /master          (placeholder 800x1000 WebP — Dmitrii portrait)
      /services        (placeholder 600x400 WebP per service)
      /reviews         (placeholder 400x600 WebP — chat screenshots)
      /og              (1200x630 WebP — Open Graph image)
    /icons             (SVG icons for services, social, UI)
  README.md
```

---

## 6. Navigation & Header (all pages)

**Sticky header** on scroll. Transparent on top → dark glass on scroll.

**Logo:** text logo — "Дмитрій" in `--font-display`, gold color.

**Navigation links (UA):** Головна | Послуги | Про мене | Відгуки | FAQ | Контакти

**Navigation links (RU):** Главная | Услуги | Обо мне | Отзывы | FAQ | Контакты

**Language switcher:** `UA | RU` toggle — top right. Switches all text via `js/lang.js` using `data-ua` / `data-ru` attributes.

**CTA button (UA):** `Написати зараз` → opens Telegram link  
**CTA button (RU):** `Написать сейчас` → opens Telegram link

**Mobile:** hamburger menu. Full-screen overlay with nav links and CTA.

---

## 7. Page Structure & Copy

### 7.1 HOME PAGE (`index.html`)

#### BLOCK 1 — HERO (full viewport height)

Aurora background active. Two columns on desktop, stacked on mobile.

**Left column — copy:**

```
UA H1: Допомога в стосунках, коханні та захисті
UA Subtitle: Таролог і парапсихолог з 10-річним досвідом. Працюю онлайн з Україною та діаспорою. Чесна діагностика без обіцянок і тиску.
UA CTA Primary: Написати в Telegram
UA CTA Secondary: Переглянути послуги

RU H1: Помощь в отношениях, любви и защите
RU Subtitle: Таролог и парапсихолог с 10-летним опытом. Работаю онлайн с Украиной и диаспорой. Честная диагностика без обещаний и давления.
RU CTA Primary: Написать в Telegram
RU CTA Secondary: Посмотреть услуги
```

**Right column:** placeholder image `800x1000` — Dmitrii portrait, warm lighting. File: `assets/images/master/dmitrii-hero.webp`. Alt UA: `Дмитрій — таролог і парапсихолог онлайн`. Alt RU: `Дмитрий — таролог и парапсихолог онлайн`.

**Kinetic typography:** H1 words appear one by one, fade+translateY, 0.1s delay between words. Triggered on page load.

---

#### BLOCK 2 — AI SUMMARY (50–70 words, critical for GEO indexing)

Full-width text block. No background — just text. This paragraph is the exact text AI search engines (ChatGPT, Perplexity) will quote. Place it inside a `<p id="ai-summary">` tag.

```
UA: Дмитрій — таролог, парапсихолог і майстер магічних практик з понад 10-річним досвідом. Спеціалізується на допомозі в стосунках, привороті, зніманні негативу та захисті. Проводить онлайн-консультації для клієнтів з України та українських діаспорних спільнот у Європі, США та Канаді. Працює під власним іменем — без анонімності, без змін номера, без зникнень.

RU: Дмитрий — таролог, парапсихолог и мастер магических практик с более чем 10-летним опытом. Специализируется на помощи в отношениях, привороте, снятии негатива и защите. Проводит онлайн-консультации для клиентов из Украины и украинских диаспорных общин в Европе, США и Канаде. Работает под собственным именем — без анонимности, без смены номера, без исчезновений.
```

---

#### BLOCK 3 — TRUST COUNTERS

4 animated counters. Count up when scrolled into view (implemented in `js/utils.js`).

| Counter | UA label | RU label |
|---|---|---|
| 10+ | років практики | лет практики |
| 1000+ | задоволених клієнтів | довольных клиентов |
| 12 | країн світу | стран мира |
| 98% | повертаються знову | возвращаются снова |

Layout: 4 columns on desktop, 2x2 grid on mobile. Each item: large number in gold `--font-display`, label below in `--text-secondary`.

---

#### BLOCK 4 — SERVICES OVERVIEW

```
UA H2: Послуги
UA Subtitle: Індивідуальний підхід до кожної ситуації

RU H2: Услуги
RU Subtitle: Индивидуальный подход к каждой ситуации
```

**6 glass cards in Bento grid layout** (asymmetric, 2 large + 4 small on desktop). Each card:
- SVG icon (custom, not generic)
- Service name (H3)
- 2-line description
- "Детальніше →" / "Подробнее →" link to service page

| Service | UA name | UA desc | RU name | RU desc | URL |
|---|---|---|---|---|---|
| Tarot | Консультація Таро | Розклад на ваше питання. Чесна відповідь без прикрас. | Консультация Таро | Расклад на ваш вопрос. Честный ответ без прикрас. | /posluhy/taro.html |
| Love magic | Приворот | Відновлення зв'язку з коханою людиною. Без гарантій і тиску. | Приворот | Восстановление связи с любимым человеком. Без гарантий и давления. | /posluhy/pryvorot.html |
| Cleansing | Очищення від негативу | Зняття чужого впливу, зурочення, пристріту. | Снятие негатива | Устранение чужого влияния, сглаза, порчи. | /posluhy/ochyshchennia.html |
| Protection | Захист та обереги | Захист вас і вашої родини від негативних впливів. | Защита и обереги | Защита вас и вашей семьи от негативных воздействий. | /posluhy/zakhyst.html |
| Money magic | Грошова магія | Розблокування фінансових потоків. Ритуали на достаток. | Денежная магия | Разблокировка финансовых потоков. Ритуалы на достаток. | /posluhy/hroshi.html |
| Diagnostics | Діагностика ситуації | Перший крок — безкоштовна діагностика вашого питання. | Диагностика ситуации | Первый шаг — бесплатная диагностика вашего вопроса. | /kontakty/index.html |

---

#### BLOCK 5 — ABOUT DMITRII (short version)

```
UA H2: Про Дмитрія
UA text: Я — Дмитрій. Таролог, парапсихолог, майстер магічних практик. Більше 10 років я допомагаю людям у найскладніших ситуаціях — в коханні, в стосунках, у захисті від негативу. Я не даю порожніх обіцянок. Я не зникаю після оплати. Я працюю під власним іменем і завжди на зв'язку.
UA CTA: Дізнатися більше про мене

RU H2: О Дмитрии
RU text: Я — Дмитрий. Таролог, парапсихолог, мастер магических практик. Более 10 лет я помогаю людям в самых сложных ситуациях — в любви, в отношениях, в защите от негатива. Я не даю пустых обещаний. Я не исчезаю после оплаты. Я работаю под собственным именем и всегда на связи.
RU CTA: Узнать больше обо мне
```

Layout: photo left (placeholder `600x700` — Dmitrii, natural setting), text right. On mobile — stacked.

---

#### BLOCK 6 — HOW IT WORKS

```
UA H2: Як проходить консультація
RU H2: Как проходит консультация
```

**3 animated steps** — horizontal on desktop, vertical on mobile. Steps appear on scroll one by one.

| Step | UA title | UA text | RU title | RU text |
|---|---|---|---|---|
| 1 | Пишете мені | Напишіть у Telegram або Viber. Опишіть ситуацію в кількох словах. | Пишете мне | Напишите в Telegram или Viber. Опишите ситуацию в нескольких словах. |
| 2 | Безкоштовна діагностика | Я аналізую ситуацію і розповідаю що бачу. Без оплати, без зобов'язань. | Бесплатная диагностика | Я анализирую ситуацию и рассказываю что вижу. Без оплаты, без обязательств. |
| 3 | Робота і результат | Якщо ви вирішите продовжити — обираємо послугу і починаємо роботу. | Работа и результат | Если вы решите продолжить — выбираем услугу и начинаем работу. |

---

#### BLOCK 7 — PRICING

```
UA H2: Вартість послуг
UA Subtitle: Безкоштовна діагностика завжди. Оплата лише якщо вирішите продовжити.

RU H2: Стоимость услуг
RU Subtitle: Бесплатная диагностика всегда. Оплата только если решите продолжить.
```

**3 glass pricing cards:**

| Card | UA name | RU name | Price | Includes |
|---|---|---|---|---|
| Start | Діагностика | Диагностика | Безкоштовно / Бесплатно | UA: Одне питання, аналіз ситуації, рекомендація щодо подальших кроків / RU: Один вопрос, анализ ситуации, рекомендация по дальнейшим шагам |
| Main | Розклад Таро | Расклад Таро | від 400 грн / от 400 грн | UA: Повний розклад на ваше питання, детальна інтерпретація, відповіді на уточнення / RU: Полный расклад на ваш вопрос, детальная интерпретация, ответы на уточнения |
| Deep | Магічна робота | Магическая работа | від 1000 грн / от 1000 грн | UA: Обряд або ритуал під вашу ситуацію, супровід до результату, зворотній зв'язок / RU: Обряд или ритуал под вашу ситуацию, сопровождение до результата, обратная связь |

Middle card (Розклад Таро) — slightly scaled up, gold border glow. Mark as popular.

```
UA note: Точна вартість — після безкоштовної діагностики
RU note: Точная стоимость — после бесплатной диагностики
```

---

#### BLOCK 8 — REVIEWS

```
UA H2: Відгуки клієнтів
RU H2: Отзывы клиентов
```

**Swiper.js carousel** — 3 slides visible on desktop, 1 on mobile. Each review card (glass):
- Placeholder image `300x400` — chat screenshot with name blurred
- Star rating: ★★★★★
- Short review text (provided below)
- Name (first name only) + city

**5 review items:**

| # | UA name | UA text | RU name | RU text |
|---|---|---|---|---|
| 1 | Олена, Київ | Зверталась з питанням щодо стосунків. Дмитрій дуже уважний, нічого зайвого не обіцяє, все пояснив чітко. Результат відчула через 3 тижні. | Елена, Киев | Обращалась с вопросом об отношениях. Дмитрий очень внимательный, ничего лишнего не обещает, всё объяснил чётко. Результат почувствовала через 3 недели. |
| 2 | Наталія, Варшава | Живу в Польщі, шукала спеціаліста онлайн. Дмитрій — єдиний хто не зник після оплати і реально допоміг. Дякую! | Наталья, Варшава | Живу в Польше, искала специалиста онлайн. Дмитрий — единственный кто не исчез после оплаты и реально помог. Спасибо! |
| 3 | Марина, Харків | Розклад Таро зробив дуже точно. Описав ситуацію так, ніби знав мене роками. Буду звертатись ще. | Марина, Харьков | Расклад Таро сделал очень точно. Описал ситуацию так, будто знал меня годами. Буду обращаться ещё. |
| 4 | Іванна, Торонто | Зверталась щодо захисту сім'ї. Дмитрій пояснив усе детально, провів обряд. Відчуваємо різницю. | Иванна, Торонто | Обращалась по поводу защиты семьи. Дмитрий объяснил всё детально, провёл обряд. Чувствуем разницу. |
| 5 | Юлія, Львів | Дякую за чесність! Не обіцяв неможливого, але допоміг розібратись у ситуації. Рекомендую. | Юлия, Львов | Спасибо за честность! Не обещал невозможного, но помог разобраться в ситуации. Рекомендую. |

---

#### BLOCK 9 — FAQ (accordion)

```
UA H2: Часті запитання
RU H2: Часто задаваемые вопросы
```

**10 accordion items** with `FAQPage` schema markup. Each item: question (visible) → answer (expands on click, animated height transition).

| # | UA question | UA answer | RU question | RU answer |
|---|---|---|---|---|
| 1 | Як проходить онлайн-консультація? | Ви пишете мені в Telegram або Viber. Я аналізую ситуацію і відповідаю текстом або голосовим повідомленням. Все відбувається зручно для вас — без відео, без розкладу. | Как проходит онлайн-консультация? | Вы пишете мне в Telegram или Viber. Я анализирую ситуацию и отвечаю текстом или голосовым сообщением. Всё происходит удобно для вас — без видео, без расписания. |
| 2 | Скільки часу займає результат? | Залежить від ситуації. Розклад Таро — відповідь в день звернення. Магічна робота — результат зазвичай помітний через 2–4 тижні. | Сколько времени занимает результат? | Зависит от ситуации. Расклад Таро — ответ в день обращения. Магическая работа — результат обычно заметен через 2–4 недели. |
| 3 | Ви даєте гарантію результату? | Ні, і жоден чесний спеціаліст не дасть. Я роблю свою роботу максимально якісно і супроводжую вас на всіх етапах. | Вы даёте гарантию результата? | Нет, и ни один честный специалист не даст. Я делаю свою работу максимально качественно и сопровождаю вас на всех этапах. |
| 4 | Працюєте з клієнтами за кордоном? | Так, я працюю онлайн з усього світу. Більшість моїх клієнтів — з України, Польщі, Німеччини, США і Канади. | Работаете с клиентами за рубежом? | Да, я работаю онлайн со всего мира. Большинство моих клиентов — из Украины, Польши, Германии, США и Канады. |
| 5 | Що потрібно для першого сеансу? | Нічого особливого. Просто напишіть мені і коротко опишіть ситуацію. Я сам поставлю уточнюючі запитання якщо потрібно. | Что нужно для первого сеанса? | Ничего особенного. Просто напишите мне и кратко опишите ситуацию. Я сам задам уточняющие вопросы если нужно. |
| 6 | Чим таролог відрізняється від гадалки? | Таролог використовує систему Таро як інструмент аналізу ситуації. Гадалка, як правило, дає передбачення. Я не передбачаю — я аналізую і допомагаю знайти вихід. | Чем таролог отличается от гадалки? | Таролог использует систему Таро как инструмент анализа ситуации. Гадалка, как правило, даёт предсказания. Я не предсказываю — я анализирую и помогаю найти выход. |
| 7 | Як відбувається оплата? | Після безкоштовної діагностики я озвучую вартість. Оплата — на карту Monobank або ПриватБанк. Для клієнтів за кордоном — PayPal або Wise. | Как происходит оплата? | После бесплатной диагностики я озвучиваю стоимость. Оплата — на карту Monobank или ПриватБанк. Для клиентов за рубежом — PayPal или Wise. |
| 8 | Чи можна замовити роботу для іншої людини? | Так, можна. Для цього потрібні ПІБ людини і дата народження. Детальніше — при особистому зверненні. | Можно ли заказать работу для другого человека? | Да, можно. Для этого нужны ФИО человека и дата рождения. Подробнее — при личном обращении. |
| 9 | Як давно ви практикуєте? | Більше 10 років. За цей час я провів понад 1000 консультацій і попрацював з клієнтами з 12 країн. | Как давно вы практикуете? | Более 10 лет. За это время я провёл более 1000 консультаций и поработал с клиентами из 12 стран. |
| 10 | Чи конфіденційні мої дані? | Так, абсолютно. Я ніколи не розголошую інформацію про клієнтів. | Конфиденциальны ли мои данные? | Да, абсолютно. Я никогда не разглашаю информацию о клиентах. |

---

#### BLOCK 10 — FINAL CTA

Aurora background active. Centered. Full-width.

```
UA H2: Готові зробити перший крок?
UA text: Напишіть мені — перша діагностика безкоштовна. Без зобов'язань, без тиску.
UA CTA 1: Написати в Telegram
UA CTA 2: Написати у Viber

RU H2: Готовы сделать первый шаг?
RU text: Напишите мне — первая диагностика бесплатно. Без обязательств, без давления.
RU CTA 1: Написать в Telegram
RU CTA 2: Написать в Viber
```

---

#### BLOCK 11 — FOOTER

```
UA copyright: © 2026 Дмитрій. Всі права захищені.
RU copyright: © 2026 Дмитрий. Все права защищены.

Links UA: Головна | Послуги | Про мене | Відгуки | FAQ | Контакти | Політика конфіденційності
Links RU: Главная | Услуги | Обо мне | Отзывы | FAQ | Контакты | Политика конфиденциальности

Contact: Telegram | Viber | WhatsApp
Phone (clickable on mobile): +380639646753
```

---

### 7.2 SERVICE PAGES (`/posluhy/`)

Each service page follows identical structure. Example for `/posluhy/taro.html`:

1. **Hero** — service name H1, 2-sentence description, CTA "Написати зараз"
2. **What is it** — 3–4 paragraphs explaining the service
3. **For whom** — 3 bullets: who benefits from this service
4. **How it works** — 3 steps specific to this service
5. **Price** — glass card with price and what's included
6. **Reviews** — 2 reviews specific to this service (use from pool above)
7. **FAQ** — 3–5 questions specific to this service
8. **CTA** — same as home final CTA block

Service page copy is provided for each service in the same UA/RU format as above. Use natural, warm language consistent with Dmitrii's positioning.

---

## 8. Language Switcher Implementation (`js/lang.js`)

All translatable elements have two data attributes:
```html
<span data-ua="Написати зараз" data-ru="Написать сейчас">Написати зараз</span>
```

```javascript
// js/lang.js
const STORAGE_KEY = 'dmitrii-lang';

function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  document.querySelectorAll('[data-ua]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.documentElement.setAttribute('lang', lang === 'ua' ? 'uk' : 'ru');
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initLang() {
  const saved = localStorage.getItem(STORAGE_KEY) || 'ua';
  setLang(saved);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

initLang();
```

---

## 9. Animations (`js/animations.js`)

All animations use GSAP + ScrollTrigger. Must respect `prefers-reduced-motion`.

```javascript
// Entrance: kinetic typography on Hero H1
// Split H1 words, animate each with stagger
gsap.from('.hero-title .word', {
  opacity: 0, y: 30,
  duration: 0.6, stagger: 0.1, ease: 'power2.out'
});

// Counters: count up on scroll
// Handled in utils.js — animateCounter(el, target, duration)

// Cards: fade + translateY on scroll
gsap.from('.glass-card', {
  scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
  opacity: 0, y: 40,
  duration: 0.5, stagger: 0.08, ease: 'power2.out'
});

// Steps: sequential reveal
gsap.from('.step-item', {
  scrollTrigger: { trigger: '.steps-block', start: 'top 75%' },
  opacity: 0, x: -30,
  duration: 0.5, stagger: 0.15
});

// Header: glass effect on scroll
window.addEventListener('scroll', () => {
  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});
```

**Floating CTA button** (always visible, bottom-right corner):
```html
<a href="https://t.me/dmitrii_master" class="floating-cta" aria-label="Написати в Telegram">
  <svg><!-- telegram icon --></svg>
</a>
```
Pulse animation: soft gold glow, 2s infinite.

---

## 10. SEO & Schema Markup

### robots.txt
```
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
```

### Schema markup — insert in `<head>` of each page

**Home page — Person schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Дмитрій",
  "jobTitle": "Таролог, парапсихолог, майстер магічних практик",
  "description": "Таролог і парапсихолог з понад 10-річним досвідом. Онлайн-консультації з України та діаспори.",
  "url": "https://dmitrii.in.ua",
  "telephone": "+380639646753",
  "sameAs": ["https://t.me/dmitrii_master"],
  "areaServed": ["UA", "DE", "PL", "CZ", "IT", "US", "CA"]
}
```

**FAQ page — FAQPage schema** (generate from all 10 FAQ items above).

**Each service page — Service schema** with name, description, provider, areaServed.

### Meta tags (per page)

**Home:**
```html
<title>Дмитрій — Таролог і парапсихолог онлайн | Консультація, приворот, очищення</title>
<meta name="description" content="Таролог і парапсихолог з 10-річним досвідом. Консультація онлайн для України та діаспори. Безкоштовна діагностика. Пишіть у Telegram або Viber.">
<link rel="canonical" href="https://dmitrii.in.ua/">
<meta property="og:title" content="Дмитрій — Таролог і парапсихолог онлайн">
<meta property="og:description" content="10 років практики. Чесна діагностика. Безкоштовний перший крок.">
<meta property="og:image" content="https://dmitrii.in.ua/assets/images/og/dmitrii-og.webp">
<meta property="og:url" content="https://dmitrii.in.ua/">
<meta name="robots" content="index, follow">
```

---

## 11. Forms (`js/forms.js`)

**Contact form fields (UA labels):** `Ваше ім'я`, `Телефон або Telegram`, `Ваше запитання` (textarea), `Згода на обробку даних` (checkbox, required).

**Contact form fields (RU labels):** `Ваше имя`, `Телефон или Telegram`, `Ваш вопрос` (textarea), `Согласие на обработку данных` (checkbox, required).

Submit: client-side validation + POST to configurable `FORM_ENDPOINT` in `forms.js`. README must explain how to swap to Formspree or custom endpoint.

Success modal (UA): `Дякую! Я отримав ваше повідомлення і зв'яжусь з вами найближчим часом.`
Success modal (RU): `Спасибо! Я получил ваше сообщение и свяжусь с вами в ближайшее время.`

---

## 12. Performance & Accessibility

- All interactive elements have `aria-label`
- FAQ accordion uses `aria-expanded` / `aria-controls`
- Mobile nav uses `aria-menu`
- Language switcher: `aria-pressed` on active button
- Focus visible styles for keyboard navigation
- All animations wrapped in `@media (prefers-reduced-motion: reduce)` check
- Images: explicit `width` + `height` to prevent CLS
- Font preconnect in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 13. AI Code Generation Tips

When sending this spec to an LLM or AI code generator, include these instructions:

1. **"Produce static HTML/CSS/JS files only — no build step, no frameworks."**
2. **"Use CSS variables from Section 4 for all colors, spacing, and typography."**
3. **"Split JavaScript into modules: `main.js`, `animations.js`, `lang.js`, `forms.js`, `utils.js`."**
4. **"Implement the Aurora animated background as CSS-only (no canvas, no library)."**
5. **"All glass cards use the glassmorphism pattern from Section 4."**
6. **"Respect `prefers-reduced-motion` in all animations."**
7. **"Use `data-ua` and `data-ru` attributes on every text element for language switching."**
8. **"Leave comments in HTML where to replace placeholder images with real WebP photos."**
9. **"Do not invent copy — use only the Ukrainian and Russian text provided in Section 6."**
10. **"The site must deploy to Vercel by dropping the folder — no build step required."**

---

## 14. Acceptance Criteria

- All pages open from `index.html` without a server
- Responsive at 320px, 768px, 1280px, 1920px
- Language switcher works and persists via localStorage
- Aurora background animates smoothly on Hero
- All glass cards have hover glow effect
- Counters animate on scroll
- FAQ accordion opens/closes with smooth animation
- Floating Telegram button is visible on all pages
- Schema markup present on home, FAQ, and service pages
- robots.txt open for all AI bots
- PageSpeed mobile score > 70

---

*End of specification. All user-facing copy is provided in Ukrainian and Russian as specified above.*
