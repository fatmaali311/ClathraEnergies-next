# Clathra Next.js Static Scaffold

This is a small Next.js scaffold modeled after the existing React/Vite admin design. It includes server-side rendered Home and About pages, plus a Navbar and Footer that use the configuration returned by your API.

Key features
- Uses getServerSideProps to fetch /config and /pages/{title} so the pages are SEO-friendly.
- Colors, logos and contact data come from the /config endpoint.

Environment
1. Copy or set environment variable API_BASE_URL to your backend base (default: http://localhost:3000)

Run locally
1. cd next-website
2. npm install
3. API_BASE_URL=http://localhost:3000 npm run dev

Files of interest
- pages/index.jsx - Home page (SSR)
- pages/about-us.jsx - About page (SSR)
- src/components/Navbar.jsx - Top navigation using config
- src/components/Footer.jsx - Footer using config

Notes
- This is a minimal scaffold to get started. You can expand pages and adjust markup/styles to match your full design exactly.
- I kept the layout and colors controlled via CSS variables so the API-provided colors are applied automatically.
