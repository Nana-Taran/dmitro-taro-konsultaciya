# Сайт Дмитрия

Рабочая статическая версия сайта Дмитрия: HTML, CSS и vanilla JavaScript без сборщика.

## Как открыть локально

Из этой папки можно открыть `index.html` напрямую или запустить локальный сервер:

```bash
python3 -m http.server 8010
```

После запуска сайт доступен по адресу:

```text
http://127.0.0.1:8010/
```

## Основная структура страниц

- `/` — главная
- `/diagnostika-otnosheniy/` — диагностика отношений
- `/taro-na-otnosheniya/` — таро на отношения
- `/posle-ssory/` — помощь после ссоры
- `/lyubovnaya-rabota/` — индивидуальная любовная работа
- `/zaschita-ochischenie/` — защита и очищение
- `/stoimost/` — стоимость
- `/o-dmitrii/` — о Дмитрии
- `/faq/` — вопросы и ответы
- `/kontakty/` — контакты
- `/privacy/` — политика конфиденциальности

## Что нужно подтвердить перед финальной публикацией

- реальные фото и видео Дмитрия;
- точные контакты Telegram, Viber, WhatsApp;
- реальные условия первого обращения;
- цены или диапазоны цен;
- текст согласия на обработку данных;
- финальный домен вместо `SITE_URL` в `sitemap.xml`, `llms.txt`, meta/canonical при добавлении.

## Технические настройки

Контакты и ссылки меняются в:

```text
js/config.js
```

Служебные файлы для индексации:

- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- `ai/dmitrii-summary.md`
- `ai/services.md`
- `ai/faq.md`

## Стратегические документы

- `DMITRII_SITE_PROMPT_PREMIUM_2026.md`
- `DMITRII_KEYWORD_AND_ADS_STRATEGY.md`
- `DMITRII_REFERENCE_CAMPAIGN_REVIEW.md`
