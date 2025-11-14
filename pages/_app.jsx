import '../styles/globals.css';
import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import Head from 'next/head';

function applyConfigColors(config) {
  if (!config) return;
  const root = typeof window !== 'undefined' ? document.documentElement : null;
  if (!root) return;

  const main = config.mainColor || config.main_color || 'var(--primary-green)';
  const secondary = config.secondaryColor || config.secondary_color || 'var(--primary-blue)';
  const title = config.titleColor || config.title_color || '#333333';
  const subtitle = config.subtitleColor || config.subtitle_color || '#777777';

  root.style.setProperty('--primary-green', main);
  root.style.setProperty('--primary-blue', secondary);
  root.style.setProperty('--title-color', title);
  root.style.setProperty('--subtitle-color', subtitle);
}

export default function App({ Component, pageProps }) {
  const cfg = pageProps?.config?.configObj || pageProps?.config || null;
  const images = pageProps?.config?.images || {}; // ✅ fixed undefined reference
  const favicon = images.main_logo || ''; // ✅ fallback favicon
  // Extract hero gradient opacity from config or use default (55%)
  const heroGradientOpacity = cfg?.heroGradientOpacity || cfg?.hero_gradient_opacity || 0.55;

  useEffect(() => {
    applyConfigColors(cfg);
    
  }, [cfg]);

  const rootStyle = cfg
    ? {
        '--primary-green': cfg.mainColor || cfg.main_color || '#ADD0B3',
        '--primary-blue': cfg.secondaryColor || cfg.secondary_color || '#afcbe5',
        '--title-color': cfg.titleColor || '#333333',
        '--subtitle-color': cfg.subtitleColor || '#777777',
        '--hero-gradient-opacity': heroGradientOpacity,
      }
    : {
        '--hero-gradient-opacity': heroGradientOpacity,
      };

  return (
    <div style={rootStyle}>
      <Head>
        <link rel="icon" type="image/png" href={favicon} />
        <link rel="apple-touch-icon" sizes="180x180" href={favicon} />
        <link rel="icon" type="image/png" sizes="32x32" href={favicon} />
        <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
        <meta name="theme-color" content={cfg?.mainColor || '#ADD0B3'} />
        <title>{cfg?.name || 'Clathra Energies'}</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ zIndex: 99999 }}
      />

      <Component {...pageProps} />
    </div>
  );
}
