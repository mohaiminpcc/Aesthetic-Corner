# Painting shop

A bilingual (English and Bangla) gallery site for selling original paintings.

- Visitors browse paintings, open one to see its size, type, materials, colours and description, then pay by bKash and submit their TrxID.
- WhatsApp and email buttons are on every painting and in the header and contact section.
- You log in at `/admin.html` to upload paintings (with Bangla and English details), edit them, mark them sold, and confirm or reject orders.

## Run it on your computer

You need Node.js 18 or newer.

```
npm install
ADMIN_PASSWORD="choose-a-strong-password" BKASH_NUMBER="01XXXXXXXXX" WHATSAPP_NUMBER="8801XXXXXXXXX" CONTACT_EMAIL="you@example.com" npm start
```

Open http://localhost:3000 for the site and http://localhost:3000/admin.html for the admin page.

On Windows (PowerShell), set the variables first, then start:

```
$env:ADMIN_PASSWORD="choose-a-strong-password"
$env:BKASH_NUMBER="01XXXXXXXXX"
npm start
```

## Settings (environment variables)

| Name | What it does | Default |
| --- | --- | --- |
| `ADMIN_USER` | Admin username | `admin` |
| `ADMIN_PASSWORD` | Admin password. Always change this. | `changeme123` |
| `SHOP_NAME_EN`, `SHOP_NAME_BN` | Site name in each language | The Aesthetic Corner, দ্য এস্থেটিক কর্নার |
| `BKASH_NUMBER` | Number customers pay to. Change this when your bKash number changes. | `01712507280` |
| `BKASH_TYPE` | `Personal` shows "Send Money", `Merchant` shows "Payment" | `Personal` |
| `WHATSAPP_NUMBER` | With country code, no + or spaces | `8801733403122` |
| `CONTACT_EMAIL` | Where customers email you | `asmarahman1809@gmail.com` |
| `SHOW_VIEWS` | Set to `0` to hide view counts from visitors. You still see them in admin. | shown |
| `TRUST_PROXY` | Set to `1` on hosting services such as Render or Railway so visitors' real IP addresses are used | off |
| `PORT` | Port to listen on | `3000` |

## View counts

Each painting shows how many times it was opened, and the footer shows total site views. A visitor is counted once per visit (browser session), so refreshing or reopening the same painting does not add up. Search engine bots are ignored, and so are your own visits while you are logged in as admin. The numbers are saved in `data/stats.json`. They are a good guide, not an exact audit, because a person can still count again by opening the site in a new private window.

## How a sale works

1. The customer opens a painting and clicks **Buy with bKash**. They see your number and the exact price.
2. They pay in the bKash app, then fill in the form with their details and the TrxID.
3. The painting is marked "Payment being checked" so nobody else can order it.
4. You open the admin page, **Orders** tab, and check the TrxID in your bKash account.
5. Click **Payment received, confirm** (painting becomes Sold) or **Reject** (painting becomes Available again).
6. Contact the customer on the phone number they gave to arrange delivery.

New orders show as a number on the Orders tab. Orders are not sent to your email automatically yet, so check that tab daily, or ask for email alerts as a next step.

## Edit the text

- Artist bio, decoration ideas section and "How to buy" steps: `public/app.js`, near the top (English under `en`, Bangla under `bn`).
- To change the bKash number without editing code, set `BKASH_NUMBER` in your host's settings and restart the site.
- Colours and fonts: `public/style.css`, the `:root` block at the top.
- The four sample paintings are marked "(sample)". Delete them from the admin page when you add your own.

## Put it online

This site needs a host that runs Node.js (a static host like plain Netlify will not work, because of the admin login and uploads). Options: Render, Railway, Fly.io, or a small VPS.

Important for any host:

1. **Keep your data on a persistent disk.** Paintings and orders are saved in the `data/` folder and photos in `uploads/`. Many hosts erase these on every deploy unless you attach a persistent volume. Mount one for both folders.
2. **Turn on HTTPS.** Most hosts do this for you with a free certificate. The admin login should never run over plain HTTP.
3. **Set a strong `ADMIN_PASSWORD`** in the host's environment settings, not in the code.
4. **Back up** the `data/` and `uploads/` folders now and then.

## Later upgrades

- Automatic bKash checkout using the bKash merchant payment gateway (needs a registered merchant account).
- Email or WhatsApp alert when a new order arrives.
- Several photos per painting.
