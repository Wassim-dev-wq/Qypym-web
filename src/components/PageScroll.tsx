'use client';
import {useScroll, useTransform} from "framer-motion";
import {useRef} from "react";
import JoinForm from "@/components/SignupForm";
import FooterSection from "@/components/Footer";
import MainPage from "@/components/MainPage";
import FeatureBlock from "@/components/AppFeatures";

const PageScroll = () => {
    const mainRef = useRef(null);

    const {scrollYProgress} = useScroll({
        target: mainRef,
        offset: ["start start", "end start"],
    });

    const topScroll = useTransform(scrollYProgress, [0, 0.2], [0, 1], { clamp: true });
    const midScroll = useTransform(scrollYProgress, [0.2, 0.8], [0, 1], { clamp: true });
    const bottomScroll = useTransform(scrollYProgress, [0.8, 1], [0, 1], { clamp: true });

    return (
        <div className="relative min-h-screen">
            <main
                ref={mainRef}
                className="absolute inset-0"
                style={{height: '500vh'}}
            >
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute inset-0 z-0 bg-hero-gradient"/>
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            backgroundImage: "url('/images/filigramme.png')",
                            backgroundRepeat: "repeat",
                            backgroundSize: "auto",
                            opacity: 0.9,
                        }}
                    />
                </div>

                <div className="relative">
                    <div className="sticky top-0">
                        <MainPage pageScroll={topScroll}/>
                    </div>
                </div>

                <div className="relative">
                    <div className="sticky top-0">
                        <FeatureBlock pageScroll={midScroll}/>
                    </div>
                </div>

                <div className="relative">
                    <div className="sticky top-0">
                        <JoinForm pageScroll={bottomScroll}/>
                    </div>
                </div>
                <div className="mt-20">
                    <FooterSection/>
                </div>
            </main>
        </div>
    );
};

export default PageScroll;