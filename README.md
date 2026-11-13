# Mama D Kitchen — Restaurant Website

Visit site: https://bayordenis.github.io/mama-d-kitchen/

## What's on the page

- **Hero**: "Akwaaba" headline, jollof photo, "See the Menu" and "Order on WhatsApp" buttons
- **Menu**: 8 dishes with photos, GH₵ prices, pepper level and filters (Rice, Swallows & soups, Beans & plantain, Small chops)
- **Gallery**: 6 more photos in a mosaic; tap any photo to open it full screen
- **Our Story**, **Visit Us** (address, hours, Google map) and a **Book a Table** form
- A floating WhatsApp **Order** button on every screen

That's 15 Ghanaian food photos in total.

## Free plugins used

| Plugin | What it does | Cost |
| --- | --- | --- |
| Google Fonts (Bowlby One, Figtree, Space Mono) | Signboard-style headings and clean body text | Free |
| AOS (Animate On Scroll) | Gentle fade-in as sections appear | Free, open source |
| GLightbox | Full-screen photo viewer for the gallery | Free, open source |
| Google Maps embed | Map in the Visit section | Free |
| WhatsApp click-to-chat (wa.me) | Orders and booking requests go straight to WhatsApp | Free |
| Formspree (optional) | Emails you each booking form | Free plan |

## Photos

All food photos are freely licensed images from **Wikimedia Commons**, loaded directly from Commons.
They're credited in the footer, which links each photo's page with its photographer and licence (most are CC BY-SA).
Keep those credits on the site. If a photo ever fails to load, its card shows a coloured panel with the dish name, so the layout never breaks.

**Use your own photos when you can.** Real pictures of Mama D's food will sell it best.
Put them in an `images/` folder, then change the `src` (and the gallery `href`) to, for example, `images/jollof.jpg`.
Landscape photos around 1200 px wide work well.

## Before you go live — fill these in

Search `index.html` for `TODO`:

1. **WhatsApp number**: replace `233000000000` (twice) with the number in international format without `+`, e.g. `233241234567`
2. **Address, phone and opening hours** in the Visit section
3. **Map**: replace `Accra%2C%20Ghana` in the map link with the exact address
4. **Prices**: the GH₵ prices are examples
5. **Our Story**: replace with Mama D's real story
6. **Social links**: Instagram and Facebook in the footer
7. **Booking emails (optional)**: create a free form at https://formspree.io and replace `YOUR_FORM_ID`. Until then, the form opens WhatsApp with the booking details filled in.

## Put it online for free

**Easiest, with no account setup: Netlify Drop**
1. Go to https://app.netlify.com/drop
2. Drag the `mama-d-kitchen` folder onto the page
3. You get a live link in seconds. Sign up (free) to keep it and rename it, e.g. `mamadkitchen.netlify.app`

**Or GitHub Pages / Vercel**: push the folder to a GitHub repository, then turn on Pages in the repo settings or import it on vercel.com.

**Custom domain (optional)**: buy a name such as `mamadkitchen.com` and connect it in Netlify or Vercel's domain settings.

## Free website builders (alternative)

If the owner would rather edit the site without code, the same content and photos work well in a free builder
such as **Google Sites** or **WordPress.com** (free plan), using a restaurant template.
