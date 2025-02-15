'use client';
import React from "react";
import {motion, MotionValue, useSpring, useTransform,} from "framer-motion";

type AppFeature = {
    id: number;
    title: string;
    shortDesc: string;
    tags: [string, string];
    fullDesc: string;
    icon: React.ReactNode;
}

type FeatureBlockProps = {
    featureData: AppFeature;
    scrollVal: MotionValue<number>;
    idx: number;
    start: number;
    end: number;
}

type AppFeaturesProps = {
    pageScroll: MotionValue<number>;
}

export const AppFeatures: React.FC<AppFeaturesProps> = ({pageScroll}) => {
    const numFeatures = 3;
    const features: AppFeature[] = [
        {
            id: 1,
            title: "Organisez des Matchs Facilement",
            shortDesc: "Créez et gérez vos rencontres sportives en quelques clics.",
            fullDesc:
                "Lancez des matchs de foot ou padel, définissez l'heure et le lieu, puis invitez des joueurs directement depuis l'application. Simplifiez l'organisation de vos rencontres sportives sans effort.",
            tags: ["Simple", "Rapide"],
            icon: (
                <svg
                    className="w-8 h-8 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                    />
                </svg>
            ),
        },
        {
            id: 2,
            title: "Trouvez des Partenaires Sportifs",
            shortDesc: "Notre algorithme intelligent vous connecte avec les meilleurs joueurs.",
            fullDesc:
                "Grâce à un système avancé, trouvez des partenaires compatibles en fonction de votre niveau, disponibilités et préférences. Rejoignez des matchs parfaitement équilibrés et amusants.",
            tags: ["Intelligent", "Personnalisé"],
            icon: (
                <svg
                    className="w-8 h-8 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            ),
        },
        {
            id: 3,
            title: "Filtres Personnalisés",
            shortDesc: "Affinez vos recherches selon vos critères spécifiques.",
            fullDesc:
                "Utilisez des filtres avancés pour rechercher des matchs par niveau de compétence, âge, sexe et objectifs sportifs (compétitif ou loisir). Trouvez exactement ce que vous recherchez pour une expérience optimale.",
            tags: ["Précis", "Flexible"],
            icon: (
                <svg
                    className="w-8 h-8 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4h13M3 8h9m-9 4h6m4 0h2m-2 4h2m-2 4h2"
                    />
                </svg>
            ),
        },
        {
            id: 4,
            title: "Chat Intégré",
            shortDesc: "Communiquez facilement avec vos partenaires de match.",
            fullDesc:
                "Discutez en temps réel avec les participants de vos matchs via notre chat intégré. Coordonnez les horaires, partagez des informations et créez une meilleure expérience sportive.",
            tags: ["Communication", "Instantané"],
            icon: (
                <svg
                    className="w-8 h-8 text-brand-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6l4 2"
                    />
                </svg>
            ),
        },
    ];

    return (
        <section id="features" className="relative min-h-[300vh]">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[#0A0A0B]"/>
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/[0.005] to-transparent"/>
            </div>

            <motion.div
                className="absolute top-0 w-full flex items-center justify-center h-screen"
                style={{
                    opacity: useSpring(
                        useTransform(pageScroll, [0, 0.2], [1, 0]),
                        {damping: 40, stiffness: 200}
                    ),
                    y: useSpring(
                        useTransform(pageScroll, [0, 0.2], [0, -50]),
                        {damping: 40, stiffness: 200}
                    ),
                }}
            >
                <h2 className="text-5xl font-extrabold text-white drop-shadow-lg">
                    Nos Fonctionnalités
                </h2>
            </motion.div>

            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {features.map((feature, idx) => {
                    const startPoint = (idx / numFeatures) * 0.6 + 0.2;
                    const endPoint = ((idx + 1) / numFeatures) * 0.6 + 0.2;

                    return (
                        <FeatureBlock
                            key={feature.id}
                            featureData={feature}
                            scrollVal={pageScroll}
                            idx={idx}
                            start={startPoint}
                            end={endPoint}
                        />
                    );
                })}
            </div>
        </section>
    );
};

export const FeatureBlock: React.FC<FeatureBlockProps> = ({
                                                       featureData,
                                                       scrollVal,
                                                       start,
                                                       end,
                                                   }) => {
    const myTransition = {damping: 40, stiffness: 200};

    const fadeIn = useTransform(
        scrollVal,
        [start, start + 0.05, end - 0.05, end],
        [0, 1, 1, 0]
    );
    const moveUp = useTransform(scrollVal, [start, end], [30, -30]);
    const getBigger = useTransform(
        scrollVal,
        [start, start + 0.05, end - 0.05, end],
        [0.98, 1, 1, 0.98]
    );

    const smoothMove = useSpring(moveUp, myTransition);
    const smoothScale = useSpring(getBigger, {...myTransition, mass: 0.8});

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-6">
                <motion.div
                    className="relative max-w-4xl mx-auto"
                    style={{
                        opacity: fadeIn,
                        y: smoothMove,
                        scale: smoothScale
                    }}
                >
                    <div className="relative overflow-hidden">
                        <div className="relative rounded-2xl backdrop-blur-2xl overflow-hidden">
                            <div className="absolute inset-0">
                                <div className="absolute inset-0 bg-[#0A0A0B]/95"/>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent"/>
                                <div
                                    className="absolute inset-0 bg-gradient-to-b from-brand-accent/[0.01] via-transparent to-transparent"/>
                            </div>

                            <div className="relative p-10 md:p-14">
                                <div className="space-y-12">
                                    <div className="flex items-start justify-between gap-8 flex-wrap md:flex-nowrap">
                                        <motion.div
                                            className="p-5 rounded-xl bg-[#12141A] border border-white/[0.02] relative group"
                                            whileHover={{scale: 1.02}}
                                            transition={myTransition}
                                        >
                                            <div
                                                className="absolute inset-0 rounded-xl bg-gradient-to-t from-brand-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
                                            <div className="relative text-white/90">{featureData.icon}</div>
                                        </motion.div>

                                        <div className="flex gap-3 flex-wrap">
                                            {featureData.tags.map((tag, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="px-5 py-2.5 rounded-full bg-[#12141A] border border-white/[0.02]"
                                                    initial={{opacity: 0, x: 20}}
                                                    animate={{opacity: 1, x: 0}}
                                                    transition={{delay: i * 0.15}}
                                                >
                                                    <span className="text-sm font-medium text-white/90">
                                                        {tag}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                            {featureData.title}
                                        </h3>

                                        <div className="grid md:grid-cols-2 gap-10">
                                            <p className="text-xl text-white/90 leading-relaxed tracking-wide">
                                                {featureData.shortDesc}
                                            </p>
                                            <div className="pl-8 border-l border-white/[0.03]">
                                                <p className="text-[#A1A1AA] leading-relaxed">
                                                    {featureData.fullDesc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.div
                                        className="pt-8 mt-8 border-t border-white/[0.03]"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{delay: 0.4}}
                                    >

                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AppFeatures;