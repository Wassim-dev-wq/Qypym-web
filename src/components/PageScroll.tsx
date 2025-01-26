'use client';
import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FeaturesBlock from "@/components/AppFeatures";
import JoinForm from "@/components/SignupForm";
import FooterSection from "@/components/Footer";
import MainPage from "@/components/MainPage";

const PageScroll = () => {
    const mainRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["start start", "end start"],
    });

    const topScroll = useTransform(scrollYProgress, [0, 0.5], [0, 1], { clamp: true });
    const bottomScroll = useTransform(scrollYProgress, [0.5, 1], [0, 1], { clamp: true });


    return (
        <div className="relative min-h-screen">
            <main
                ref={mainRef}
                className="absolute inset-0"
                style={{height: '200vh'}}
            >
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-hero-gradient"/>
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(230,153,0,0.08)_0%,transparent_40%)]"/>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_75%,rgba(255,181,46,0.05)_0%,transparent_30%)]"/>
                    </div>
                </div>

                <div className="relative">
                    <div className="sticky top-0">
                        <MainPage pageScroll={topScroll}/>
                    </div>
                </div>

                <div className="relative">
                    <div className="sticky top-0">
                        <JoinForm pageScroll={bottomScroll}/>
                    </div>
                </div>
                <FooterSection/>
            </main>
        </div>
    );
};

export default PageScroll;