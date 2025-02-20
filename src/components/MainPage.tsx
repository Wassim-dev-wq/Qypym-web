'use client';
import { motion, MotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import React, {useEffect} from 'react';
import {MobileView} from '@/components/MobileView';
import {encodeTrackingData} from "@/lib/linkEncoder";

type MainPageProps = {
    pageScroll: MotionValue<number>;
};

export const MainPage: React.FC<MainPageProps> = ({ pageScroll }) => {
    const fadeContent = useTransform(pageScroll, [0, 0.3], [1, 0]);
    const shrinkContent = useTransform(pageScroll, [0, 0.3], [1, 0.95]);
    const growPhone = useTransform(pageScroll, [0.4, 0.6], [0.8, 0.85]);
    const movePhoneUp = useTransform(pageScroll, [0.2, 0.6], [100, 0]);
    const smoothStuff = { damping: 50, stiffness: 200 };
    const smoothScale = useSpring(shrinkContent, smoothStuff);

    useEffect(() => {
        const encodedLink = encodeTrackingData('instagram', 'social', 'waitlist');
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        console.log('Encoded Tracking Link:', encodedLink);
        console.log('Full Tracking URL:', `${appUrl}/r/${encodedLink}`);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const checkTrackingCookie = () => {
            const trackingCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('tracking_data='));
            if (trackingCookie) {
                try {
                    const cookieVal = decodeURIComponent(trackingCookie.split('=')[1]);
                    const trackingData = JSON.parse(cookieVal);
                    window.gtag?.('event', 'campaign_landing', {
                        utm_source: trackingData.s,
                        utm_medium: trackingData.m,
                        utm_campaign: trackingData.c
                    });
                } catch (error) {
                    console.error('Error parsing tracking cookie:', error);
                }
            }
        };
        checkTrackingCookie();
    }, []);
    return (
        <section id="accueil">
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-1/4 -left-1/2 w-full h-full bg-brand-accent/[0.02] blur-3xl"
                    animate={{
                        opacity: [0.02, 0.04, 0.02],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            </div>

            <div className="container max-w-7xl mx-auto px-6 flex flex-col items-center relative pt-24">
                <div className="container max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <motion.div className="text-center max-w-3xl mb-4"
                                style={{opacity: fadeContent, scale: smoothScale}}>
                        <motion.div className="relative" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
                            <h1 className="relative inline-block">
                                <motion.span
                                    className="relative block text-5xl md:text-6xl font-extrabold tracking-tighter uppercase"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.3}}
                                >
                                  <span
                                      className="relative bg-gradient-to-r from-brand-accent via-brand-hover to-brand-accent bg-clip-text text-transparent animate-gradient-x block mb-2">
                                    Trouve des joueurs,
                                  </span>
                                </motion.span>
                                <motion.span
                                    className="block relative text-5xl md:text-6xl font-extrabold tracking-tighter uppercase"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.35}}
                                >
                                    <span className="relative inline-block w-fit px-3 py-2 bg-white rounded-lg block">
                                        <span
                                            className="bg-gradient-to-r from-brand-accent via-brand-hover to-brand-accent bg-clip-text text-transparent animate-gradient-x">
                                          Réserve et joue
                                        </span>
                                      </span>
                                    <span
                                        className="relative inline-block w-fit px-3 py-2 bg-white rounded-lg block mt-2">
                                        <span
                                            className="bg-gradient-to-r from-brand-accent via-brand-hover to-brand-accent bg-clip-text text-transparent animate-gradient-x">
                                          sans prise de tête !
                                        </span>
                                      </span>
                                    <span
                                        className="absolute -inset-2 bg-brand-accent/10 blur-2xl rounded-lg opacity-75 transition duration-1000"/>
                                </motion.span>
                            </h1>
                            <div className="mt-8">
                                <span className="text-4xl font-bold text-[#F9FAFB] drop-shadow-2xl">
                                  Bientôt Disponible
                                </span>
                            </div>
                        </motion.div>
                        <motion.div
                            className="flex flex-col items-center gap-4 mb-6 mt-6"
                            style={{opacity: fadeContent}}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.4}}
                        >
                            <Link
                                href="#waitlist"
                                className="bg-brand-accent hover:bg-brand-hover text-[#0A0A0B] font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/20 tracking-wide flex items-center justify-center gap-2 relative overflow-hidden group"
                            >
                                <span className="relative">Rejoindre la communauté</span>
                                <div
                                    className="absolute inset-0 bg-gradient-to-r from-brand-accent/0 via-white/10 to-brand-accent/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-all duration-1000"/>
                            </Link>
                        </motion.div>
                        <motion.div className="mt-4">
                            <motion.div className="flex flex-row items-center justify-center gap-4 text-white text-sm">
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"/>
                                    Accès Privilégié
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"/>
                                    Bénéfices Exclusifs
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"/>
                                    Rencontre des sportifs pour combler tes sessions
                                </span>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <MobileView scale={growPhone} y={movePhoneUp}/>
                </div>
            </div>
        </section>
    );
};

export default MainPage;
