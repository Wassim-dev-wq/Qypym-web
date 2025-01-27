import type {Metadata} from "next";
import {Geist} from "next/font/google";
import "./globals.css";
import React from "react";

const geist = Geist({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "QYPYM",
    description: "Trouve tes partenaires de sport",
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
        </html>
    );
}