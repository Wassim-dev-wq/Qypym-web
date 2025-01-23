"use client";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import Image from "next/image";

const HeroSection = () => {
    const {scrollYProgress} = useScroll();

    // it works better with a smooth transition
    const smoothTransition = {damping: 25, stiffness: 280};

    // zoom out when i scroll down
    const zoomOut = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [1, 0.75]),
        smoothTransition
    );

    const moveUp = useSpring(
        useTransform(scrollYProgress, [0, 0.4], [0, -150]),
        smoothTransition
    );

    // app features
    const sections = [
        {titre: "Rejoint la Team", desc: "Trouve des partenaires de sport"},
        {titre: "Défie les Autres", desc: "Participe aux compétitions locales"},
        {titre: "Lorem", desc: "Lorem Lorem Lorem Lorem"},
    ];


    return (
        <main className="relative">
            <section className="h-screen items-center px-6 lg:px-20 py-24 relative">
                <motion.div
                    className="h-full flex flex-col items-center justify-center"
                    style={{
                        scale: zoomOut,
                        y: moveUp
                    }}
                    transition={{duration: 0.8}}
                >
                    <Image
                        src="/images/primary.png"
                        alt="SportMeet App"
                        width={340}
                        height={680}
                        priority
                        className="z-20 hover:scale-105 transition-all duration-300" // small effect when hovering
                    />

                    <motion.div
                        className="absolute bottom-10 flex flex-col items-center gap-2"
                        animate={{
                            y: [0, 12, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-amber-400/30 to-amber-400/0"/>
                        <span className="text-amber-400/60 text-sm">Découvre plus</span>
                    </motion.div>
                </motion.div>
            </section>
            <section className="min-h-screen bg-zinc-950/95 px-6 py-24 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    {sections.map((item, i) => (
                        <motion.div
                            key={item.titre}
                            className="mb-32 hover:translate-x-2 transition-all"
                            initial={{opacity: 0, y: 60}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, margin: "-100px"}}
                            transition={{
                                delay: i * 0.3,
                                duration: 0.8,
                                ease: "easeOut"
                            }}
                        >
                            <h2 className="text-4xl font-light text-amber-400 mb-4">
                                {item.titre}
                            </h2>
                            <p className="text-white/80 text-xl">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HeroSection;