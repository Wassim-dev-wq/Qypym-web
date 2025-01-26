"use client";
import Link from "next/link";

const NavMenu = () => {
    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-sm overflow-hidden">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-white">
                        QYPYM
                    </Link>
                    <div className="flex gap-6">
                        <Link href="#accueil" className="text-white/80 hover:text-white transition-colors">
                            Accueil
                        </Link>
                        <Link href="#features" className="text-white/80 hover:text-white transition-colors">
                            Fonctionnalités
                        </Link>
                        <Link href="#waitlist" className="text-white/80 hover:text-white transition-colors">
                            Rejoindre
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;