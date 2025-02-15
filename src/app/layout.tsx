import type {Metadata} from "next";
import {Geist} from "next/font/google";
import "./globals.css";
import React from "react";
import {Toaster} from "sonner";

const geist = Geist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "QYPYM",
    description: "Trouve tes partenaires de sport",
    icons: {
        icon: [
            { url: '/qypym_logo.ico', sizes: 'any' }
        ],
        shortcut: '/qypym_logo.ico',
        apple: '/qypym_logo.ico',
      }
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
        <body className={`${geist.className} antialiased`}>
        {children}
        </body>
        <Toaster
            position="top-center"
            toastOptions={{
                style: {
                    background: '#12141A',
                    border: '1px solid #27272A',
                    color: '#fff',
                },
                className: 'my-toast-class',
            }}
        />
        </html>
    );
}