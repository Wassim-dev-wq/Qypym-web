'use client';
import {motion, MotionValue, useSpring, useTransform} from 'framer-motion';
import Link from 'next/link';
import React, {useEffect} from 'react';
import {MobileView} from '@/components/MobileView';
import {encodeTrackingData} from "@/lib/linkEncoder";

type MainPageProps = {
    pageScroll: MotionValue<number>;
};

export const MainPage: React.FC<MainPageProps> = ({pageScroll}) => {
    const fadeContent = useTransform(pageScroll, [0, 0.3], [1, 0]);
    const shrinkContent = useTransform(pageScroll, [0, 0.3], [1, 0.95]);
    const growPhone = useTransform(pageScroll, [0.3, 0.6], [0.8, 1]);
    const movePhoneUp = useTransform(pageScroll, [0.3, 0.6], [100, 0]);
    const smoothStuff = {damping: 50, stiffness: 200};
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

    const txtAnims = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    };

    return (
        <section id="accueil" className="relative bg-[#0A0A0B]">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-[#111112] to-[#0A0A0B]"/>
                <div className="absolute top-0 left-0 w-full h-full opacity-40">
                    <div
                        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-accent/5 via-transparent to-transparent"/>
                </div>
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

            <div className="container max-w-7xl mx-auto px-6 flex flex-col items-center relative z-10 pt-36">
                <div className="container max-w-7xl mx-auto px-6 flex flex-col items-center">
                    <motion.div
                        className="text-center max-w-3xl mb-8"
                        style={{
                            opacity: fadeContent,
                            scale: smoothScale
                        }}
                    >
                        <motion.div
                            className="relative z-10"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                        >
                            <h1 className="relative inline-block">
                <span className="text-4xl md:text-6xl font-bold mb-6 text-[#F9FAFB]">
                  Bientôt Disponible
                </span>
                                <br/>
                                <motion.span
                                    className="text-4xl md:text-7xl font-extrabold relative inline-block"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    transition={{delay: 0.3}}
                                >
                  <span
                      className="bg-gradient-to-r from-brand-accent via-brand-hover to-brand-accent bg-clip-text text-transparent animate-gradient-x">
                    La Nouvelle Ère du Sport
                  </span>
                                    <span
                                        className="absolute -inset-2 bg-brand-accent/10 blur-2xl rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000"/>
                                </motion.span>
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-xl text-[#E5E7EB] mt-6 mb-6 font-normal tracking-wide"
                            variants={txtAnims}
                            transition={{delay: 0.3}}
                        >
                            <span className="text-brand-accent">Rejoignez</span> la communauté des{' '}
                            <span className="text-brand-accent">premiers utilisateurs</span> et{' '}
                            <br className="hidden sm:block"/>
                            façonnez l&apos;avenir du sport connecté
                        </motion.p>

                        <motion.div
                            className="flex justify-center gap-6 text-sm md:text-base text-[#D1D5DB] mt-4"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.7}}
                        >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"/>
                Accès Privilégié
              </span>
                            <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"/>
                Bénéfices Exclusifs
              </span>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex flex-col items-center gap-4 mb-12"
                        style={{opacity: fadeContent}}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.4}}
                    >
                        <p className="text-[#D1D5DB] font-medium">
                            Inscrivez-vous pour recevoir les notifications de lancement
                        </p>
                        <Link
                            href="#waitlist"
                            className="bg-brand-accent hover:bg-brand-hover text-[#0A0A0B] font-semibold py-3 px-8 rounded-lg transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/20"
                        >
                            Rejoignez la liste d&apos;attente
                        </Link>
                    </motion.div>

                    <MobileView scale={growPhone} y={movePhoneUp}/>
                </div>
            </div>
        </section>
    );
};

export default MainPage;
