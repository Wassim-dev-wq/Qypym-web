"use client";
import {motion, MotionValue, useSpring, useTransform} from "framer-motion";
import React, {useState} from "react";

type SignupProps = {
    pageScroll: MotionValue<number>;
}

export const SignupForm: React.FC<SignupProps> = ({pageScroll}) => {
    const [userInput, setUserInput] = useState({
        email: "",
        sportsLiked: [] as string[],
        foundUs: "other",
    });

    const sportsList = ["Football", "Padel"];

    const pickSport = (sport: string) => {
        setUserInput((prev) => ({
            ...prev,
            sportsLiked: prev.sportsLiked.includes(sport)
                ? prev.sportsLiked.filter((s) => s !== sport)
                : [...prev.sportsLiked, sport],
        }));
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data:", userInput);
    };

    const smoothScroll = useSpring(pageScroll, {
        damping: 40,
        stiffness: 100,
    });

    const headerFade = useTransform(smoothScroll, [0, 0.2], [0, 1]);
    const headerMove = useTransform(smoothScroll, [0, 0.2], [5, 0]);

    const formFade = useTransform(smoothScroll, [0.1, 0.3], [0, 1]);
    const formMove = useTransform(smoothScroll, [0.1, 0.3], [50, 0]);

    return (
        <section id="waitlist" className="relative min-h-screen">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[#0A0A0B]"/>
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/[0.005] to-transparent"/>
            </div>
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    className="absolute top-24 w-full flex justify-center"
                    style={{
                        opacity: headerFade,
                        y: headerMove,
                    }}
                >
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            <span
                                className="bg-gradient-to-r from-brand-accent to-brand-hover bg-clip-text text-transparent">
                                Rejoignez l&apos;Aventure
                             </span>
                        </h2>
                        <p className="text-xl text-neutral-300">
                            Soyez parmi les premiers à façonner le futur du sport connecté
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="container mx-auto px-6"
                    style={{
                        opacity: formFade,
                        y: formMove,
                    }}
                >
                    <div className="max-w-2xl mx-auto">
                        <div
                            className="p-8 rounded-2xl bg-[#12141A] border border-neutral-800 backdrop-blur-sm relative">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-brand-accent to-brand-hover opacity-5 rounded-2xl"/>
                            <div className="relative z-10">
                                <form onSubmit={submitForm} className="space-y-8">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label htmlFor="email" className="text-neutral-200">
                                                Email
                                            </label>
                                            <span className="text-sm text-neutral-400">* Requis</span>
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 rounded-lg bg-[#12141A] border border-neutral-800 text-neutral-100 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-colors"
                                            placeholder="your@email.com"
                                            value={userInput.email}
                                            onChange={(e) =>
                                                setUserInput((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }))
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-neutral-200 mb-3">
                                            Sports qui vous intéressent
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {sportsList.map((sport) => (
                                                <button
                                                    key={sport}
                                                    type="button"
                                                    onClick={() => pickSport(sport)}
                                                    className={`px-4 py-2 rounded-full border transition-all ${
                                                        userInput.sportsLiked.includes(sport)
                                                            ? "border-brand-accent text-brand-accent bg-brand-accent/10"
                                                            : "border-neutral-700 text-neutral-300 hover:border-neutral-600"
                                                    }`}
                                                >
                                                    {sport}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="foundUs"
                                            className="block text-neutral-200 mb-2"
                                        >
                                            Comment avez-vous connu QYPYM ?
                                        </label>
                                        <select
                                            id="foundUs"
                                            className="w-full px-4 py-3 rounded-lg bg-[#12141A] border border-neutral-800 text-neutral-100 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-colors"
                                            value={userInput.foundUs}
                                            onChange={(e) =>
                                                setUserInput((prev) => ({
                                                    ...prev,
                                                    foundUs: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="other">Autre</option>
                                            <option value="friend">Un ami</option>
                                            <option value="social">Réseaux sociaux</option>
                                            <option value="search">Moteur de recherche</option>
                                        </select>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-brand-accent to-brand-hover text-black font-semibold py-4 px-8 rounded-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/20"
                                        >
                                            Rejoindre la liste d&apos;attente
                                        </button>
                                        <p className="mt-4 text-center text-sm text-neutral-400">
                                            🔒 Vos données sont sécurisées et ne seront jamais partagées
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SignupForm;