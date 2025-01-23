"use client";
import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";

const AppLayout = () => {

    // to be improved
    const menuItems = ['Fonctionnalités', 'À propos', 'Contact'];

    return (
        <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
            <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-amber-500/5 via-transparent to-amber-900/10" />
            <nav className="fixed top-0 w-full z-50 py-6 px-8 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <motion.span
                        className="text-2xl font-light tracking-wider"
                        whileHover={{scale: 1.05}}
                        transition={{type: "spring", stiffness: 400}}
                    >
                        QYPYM<span className="text-amber-400">.</span>
                    </motion.span>
                    <div className="flex gap-12">
                        {menuItems.map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                className="text-sm font-light tracking-wide text-white/80 hover:text-amber-300 transition-all"
                                whileHover={{
                                    y: -2,
                                    scale: 1.1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 400
                                    }
                                }}
                            >
                                {item}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </nav>
            <div className="relative z-10">
                <HeroSection />
            </div>
        </div>
    );
};

export default AppLayout;