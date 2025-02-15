"use client";
import Link from "next/link";
import { useState } from "react";

const NavMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-white">
                        QYPYM
                    </Link>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 transition-transform duration-300 ease-in-out"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <div className="hidden md:flex gap-6">
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

                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="flex flex-col gap-4 py-4">
                        <Link
                            href="#accueil"
                            className="text-white/80 hover:text-white transition-colors hover:translate-x-2 transform duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Accueil
                        </Link>
                        <Link
                            href="#features"
                            className="text-white/80 hover:text-white transition-colors hover:translate-x-2 transform duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Fonctionnalités
                        </Link>
                        <Link
                            href="#waitlist"
                            className="text-white/80 hover:text-white transition-colors hover:translate-x-2 transform duration-200"
                            onClick={() => setIsOpen(false)}
                        >
                            Rejoindre
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavMenu;