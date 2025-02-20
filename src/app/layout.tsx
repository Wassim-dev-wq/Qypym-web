import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import { Toaster } from "sonner";
import Script from "next/script";

const geist = Geist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "QYPYM",
    description: "Trouve tes partenaires de sport",
    icons: {
        icon: [
            { rel: 'icon', url: '/icon.ico' },
        ],
        apple: [
            { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
        ],
    }
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    const GA_TRACKING_ID = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

    return (
        <html lang="fr">
        <head>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
                {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                            page_path: window.location.pathname,
                        });
                    `}
            </Script>
        </head>
        <body className={`${geist.className} antialiased relative`}>
        {children}
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: '#12141A',
                    border: '1px solid rgba(82, 82, 91, 0.25)',
                    color: '#fff',
                    borderRadius: '12px',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25)',
                    fontSize: '0.9375rem',
                    padding: '16px',
                },
                className: 'my-toast-class',
            }}
            closeButton
            richColors
            expand={false}
            duration={4000}
        />
        </body>
        </html>
    )
        ;
}