"use client";
import Link from "next/link";
import React from "react";

type SocialLink = {
    name: string;
    url: string;
    logo: React.ReactNode;
}

const Footer = () => {
    const year = new Date().getFullYear();

    const socials: SocialLink[] = [
        {
            name: "Instagram",
            url: "https://instagram.com/qypymoff",
            logo: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
                </svg>
            )
        },
        {
            name: "X (Twitter)",
            url: "https://x.com/qypym63489",
            logo: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
            )
        },
        {
            name: "TikTok",
            url: "https://tiktok.com/@qypym",
            logo: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
            )
        }
    ];

    return (
        <footer className="relative py-12 border-t border-neutral-800 bg-hero-gradient">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <span
                                    className="text-2xl font-bold bg-gradient-to-r from-brand-accent to-brand-hover bg-clip-text text-transparent">
                                    QYPYM
                                </span>
                                <div className="h-4 w-px bg-neutral-800"/>
                                <div className="flex space-x-4">
                                    {socials.map(social => (
                                        <Link
                                            key={social.name}
                                            href={social.url}
                                            className="text-neutral-400 hover:text-brand-accent transition-colors"
                                        >
                                            {social.logo}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <p className="text-neutral-400 text-sm">
                                Connectez-vous avec des partenaires sportifs près de chez vous
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-end gap-x-12 gap-y-4 text-sm">
                            <Link href="#" className="text-neutral-400 hover:text-brand-accent transition-colors">
                                Politique de confidentialité
                            </Link>
                            <Link href="#" className="text-neutral-400 hover:text-brand-accent transition-colors">
                                Conditions d&apos;utilisation
                            </Link>
                            <Link href="mailto:contact@qypym.com"
                                  className="text-neutral-400 hover:text-brand-accent transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-neutral-800">
                        <p className="text-center text-sm text-neutral-500">
                            © {year} QYPYM. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;