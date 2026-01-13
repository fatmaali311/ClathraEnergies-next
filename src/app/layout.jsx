import '../styles/globals.css';
import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Providers from './providers';

export const metadata = {
    title: {
        default: 'Clathra Energies',
        template: '%s | Clathra Energies',
    },
    description: 'Transforming Waste into Clean Energy with Advanced Biogas Solutions.',
    keywords: ['Biogas', 'Renewable Energy', 'Waste Management', 'Sustainability', 'Clathra Energies'],
    authors: [{ name: 'Clathra Energies' }],
    creator: 'Clathra Energies',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
        title: 'Clathra Energies',
        description: 'Transforming Waste into Clean Energy with Advanced Biogas Solutions.',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        siteName: 'Clathra Energies',
        images: [
            {
                url: '/logo.png', // Fallback, should be dynamic if possible
                width: 800,
                height: 600,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clathra Energies',
        description: 'Transforming Waste into Clean Energy with Advanced Biogas Solutions.',
    },
    robots: {
        index: true,
        follow: true,
    },
};

import ThemeRegistry from '../components/common/ThemeRegistry';

import { Outfit } from 'next/font/google';

const outfit = Outfit({ subsets: ['latin'] });

export default async function RootLayout({ children }) {
    const API_BASE = process.env.API_BASE_URL || 'http://localhost:3000';
    let config = {};

    try {
        const res = await fetch(`${API_BASE}/config`, { next: { revalidate: 3600 } });
        if (res.ok) {
            config = await res.json();
        }
    } catch (error) {
        console.error('Failed to fetch config for layout:', error);
    }

    return (
        <html lang="en">
            <body className={outfit.className}>
                <Providers>
                    <ThemeRegistry config={config} />
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
                    {children}
                </Providers>
            </body>
        </html>
    );
}
