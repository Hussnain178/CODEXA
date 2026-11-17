# CODEXA by Adam

Production-ready single-page marketing site for **CODEXA by Adam** — practical tech courses in web, mobile, automation, and office skills.

**Stack:** React · Vite · Tailwind CSS v4 · Framer Motion · lucide-react  
**Hosting:** Static SPA — deploy on Vercel (or any static host).

## Run locally

```bash
cd codexa
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Edit content

| What | File |
|------|------|
| Brand, WhatsApp, Google Form URL, fee visibility, form prefill | `src/config/site.js` |
| Courses (fees, weeks, topics, outcomes) | `src/data/courses.js` |
| Instructor / staff | `src/data/staff.js` |
| FAQ | `src/data/faqs.js` |

### Fees

`SHOW_FEES` in `src/config/site.js` controls whether cards show `PKR …` or **Contact for fee**.

### WhatsApp

Number is `923304656990`. Helpers live on `site.whatsapp` — default and course-specific messages are already wired into CTAs, the lead modal, and the floating button.

### Google Form lead capture

`formUrl` points at the embedded Google Form. To prefill the course field:

1. In Google Forms → open the field → ⋮ → **Get pre-filled link**
2. Fill a sample value → **Get link**
3. Copy the `entry.XXXXXXXXXXXX` number from the URL
4. Set `FORM_PREFILL_ENTRY_ID` in `src/config/site.js`

Leave it `""` to skip prefill (the modal still shows the selected course and asks the user to match it in the form).

### Staff placeholders

`src/data/staff.js` currently has one member (Adam). Photo/bio/socials are marked **PLACEHOLDER** — set `photo` to a URL or leave `null` for initials avatar. The grid layout works for 1–4 members.

## Deploy on Vercel

1. Push this folder to a GitHub repo (or import the directory).
2. In Vercel: **Add New Project** → import the repo.
3. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
4. `vercel.json` rewrites all routes to `index.html` for SPA-safe deep links.

Or from the CLI:

```bash
npx vercel
```

## Accessibility & UX notes

- Semantic landmarks, skip link, focus-visible styles, dialog focus trap + Esc/overlay close
- `prefers-reduced-motion` softens animations and marquee
- Smooth anchor scroll with navbar offset (`scroll-padding-top`)
- No `localStorage` (WhatsApp tip uses `sessionStorage` with try/catch)
