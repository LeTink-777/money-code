# Расшифровка денежного кода по дате рождения

Воронка на Next.js 16 (App Router, TypeScript, Tailwind CSS 4) с оплатой через ЮKassa.

Прод: https://money-code.vercel.app

## Тарифы

| Тариф | Цена | Было | Доставка |
| --- | --- | --- | --- |
| БАЗОВЫЙ | 290 ₽ | ~~990 ₽~~ | 24 часа |
| ПОЛНЫЙ | 590 ₽ | ~~2490 ₽~~ | 12 часов |
| МАКСИМУМ | 1290 ₽ | ~~4900 ₽~~ | 6 часов |

## Локальный запуск

```bash
npm install
cp .env.example .env.local   # и подставить боевой секретный ключ
npm run dev
```

## Переменные окружения

| Переменная | Назначение |
| --- | --- |
| `YOOKASSA_SHOP_ID` | ID магазина ЮKassa |
| `YOOKASSA_SECRET_KEY` | Секретный ключ ЮKassa (только на сервере) |
| `YOOKASSA_SEND_RECEIPT` | `true`, если магазин настроен на фискализацию |
| `NEXT_PUBLIC_SITE_URL` | Базовый адрес сайта для return_url и sitemap |
| `RESEND_API_KEY` | Ключ Resend для доставки результата письмом |
| `RESEND_FROM` | Адрес отправителя писем |

Способ оплаты намеренно не фиксируется в запросе: ЮKassa показывает все методы,
подключённые к магазину.

## Скрипты

```bash
npm run dev      # разработка
npm run build    # продакшн-сборка
npm run icons    # PNG-иконки из public/favicon.svg
npm run og       # og-image.png 1200x630
npm run assets   # иконки + og-image разом
npx tsc --noEmit # проверка типов
```

## Юридические страницы

`/privacy` — политика конфиденциальности, `/offer` — публичная оферта.
Реквизиты: Евдокимов Даниил Владимирович, ИНН 381928138362, Самозанятый (плательщик НПД).

Вебхук ЮKassa: `POST https://money-code.vercel.app/api/payment/webhook`.
