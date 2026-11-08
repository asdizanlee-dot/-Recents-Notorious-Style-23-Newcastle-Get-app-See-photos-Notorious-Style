# Notorious Style Barbershop & Salon

Official web application for **Notorious Style**, a premier barbershop and hair salon located at **625 Albany Hwy, Victoria Park WA 6100, Australia**.

Built with React 19, TypeScript, Tailwind CSS, Vite, and Lucide Icons.

---

## 🚀 Publishing to GitHub & Deploying to Vercel

All brand assets, photos, artisan portraits, and styling gallery images are located in the `/public/assets/` directory (`/public/assets/images/` and `/public/assets/brand/`). 

Because Vite automatically copies everything from `/public` directly into `/dist` on production build (`npm run build`), **100% of your images, logos, and photos will load seamlessly on Vercel without broken links**.

---

### Step 1: Push to GitHub

1. Open your terminal in the project directory:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Notorious Style barbershop web app with full asset suite"
   ```

2. Create a new repository on [GitHub](https://github.com/new) (e.g. `notorious-style-website`).

3. Link and push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/notorious-style-website.git
   git branch -M main
   git push -u origin main
   ```

---

### Step 2: Deploy to Vercel

1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New…** > **Project**.
3. Import your GitHub repository (`notorious-style-website`).
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

Within 30–60 seconds, your site will be live on your custom `.vercel.app` URL or custom domain (e.g. `notoriousstyle.com.au`).

---

### Features & Integrations Included:
- **Interactive Online Appointment Booking**: Date picker (next 14 days), morning/afternoon/late night slots, service selection, and artisan choice (Andy & Syed).
- **Offline / Local Storage Booking Persistence**: Clients can view and manage their appointment receipts under "My Bookings" with `.ics` calendar file downloads.
- **Service Categories & AUD Pricing (10% GST Included)**:
  - Men's Haircuts (Skin Fades, Tapers, Modern & Classic Haircuts, Hair Styling)
  - Beard Grooming (Trimming, Shaping, Line-ups, Styling)
  - Women's Hair Services (Haircuts, Colouring, Full-head Foils / Highlights)
  - Beauty Services (Nail Services, Hair Removal)
- **Artisans**: Dedicated profiles and photography for Andy (Owner) and Syed (Barber at Notorious Style).
- **Google Business Profile Integration**: Live 4.6 ★ rating with 97 authentic reviews, review submission modal, and direct Google Maps navigation link.
- **Interactive Albany Hwy Map**: Layer toggles for Street Map, Transperth Transit (Bus 960/177/178 & Victoria Park Station), and local street/council parking.
- **SPA Rewrites**: Pre-configured `vercel.json` for smooth client-side navigation.
