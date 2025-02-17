import {motion, MotionValue, useSpring, useTransform} from "framer-motion";
import React, {useState} from "react";
import {addDoc, collection, serverTimestamp} from 'firebase/firestore';
import {db} from '@/lib/firebase';
import {handleFirebaseError} from '@/lib/errorUtils';
import {Loader2} from "lucide-react";
import {toast} from 'sonner';

type SignupProps = {
    pageScroll: MotionValue<number>;
}

interface UserInput {
    email: string;
    sportsLiked: string[];
    foundUs: string;
}

export const SignupForm: React.FC<SignupProps> = ({pageScroll}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInput, setUserInput] = useState<UserInput>({
        email: "",
        sportsLiked: [],
        foundUs: "other",
    });

    const sportsList = ["Football", "Padel"];

    const validateForm = () => {
        if (!userInput.email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
            toast.error('Veuillez entrer une adresse email valide.');
            return false;
        }
        return true;
    };

    const pickSport = (sport: string) => {
        setUserInput((prev) => ({
            ...prev,
            sportsLiked: prev.sportsLiked.includes(sport)
                ? prev.sportsLiked.filter((s) => s !== sport)
                : [...prev.sportsLiked, sport],
        }));
    };

    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            let trackingData = null;
            const trackingCookie = document.cookie
                .split('; ')
                .find(row => row.startsWith('tracking_data='));
            if (trackingCookie) {
                try {
                    const cookieVal = trackingCookie.split('=')[1];
                    const decoded = decodeURIComponent(cookieVal);
                    trackingData = JSON.parse(decoded);
                } catch (error) {
                    console.error("Error parsing tracking cookie:", error);
                }
            }
            const submissionData = {
                ...userInput,
                createdAt: serverTimestamp(),
                source: 'website_waitlist',
                userAgent: navigator.userAgent,
                locale: navigator.language,
                timestamp: new Date().toISOString(),
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                country: navigator.language.split('-')[1] || null,
                tracking: trackingData,
            };

            const waitlistRef = collection(db, 'waitlist');
            const docRef = await addDoc(waitlistRef, submissionData);
            const mailRef = collection(db, 'mail');
            const emailData = {
                    to: userInput.email,
                    message: {
                    subject: "Bienvenue dans l'élite QYPYM",
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px;">
                            <div style="text-align: center; margin-bottom: 30px;">
                                <h1 style="color: #FFB800; margin-bottom: 10px; text-shadow: 0 0 10px rgba(255, 184, 0, 0.3);">Bienvenue chez QYPYM !</h1>                                <p style="color: #666; font-size: 18px;">Le futur du sport connecté commence ici</p>
                            </div>
                
                            <div style="background-color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                                    Bonjour,
                                </p>
                                
                                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                                    Nous vous remercions d'avoir rejoint la liste d'attente QYPYM ! Nous sommes ravis de vous compter parmi nos premiers membres.
                                    ${userInput.sportsLiked.length > 0
                                        ? `Votre passion pour ${userInput.sportsLiked.join(' et ')} nous inspire à créer une expérience sportive encore meilleure.`
                                        : 'Votre intérêt pour le sport connecté nous inspire à créer une expérience unique.'}
                                </p>
                
                                <p style="color: #333; font-size: 16px; line-height: 1.6;">
                                    Restez à l'écoute ! Nous vous tiendrons informé(e) des développements passionnants à venir.
                                </p>
                                
                                <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 30px;">
                                    Sportivement,<br>
                                    L'équipe QYPYM
                                </p>
                            </div>
                

                            <div style="text-align: center; margin-top: 35px;">
                                <p style="color: #718096; font-size: 16px; font-weight: 500; margin-bottom: 20px;">
                                    Suivez notre actualité sur les réseaux sociaux
                                </p>
                                <div style="margin-bottom: 30px;">
                                    <a href="https://instagram.com/qypymoff" style="display: inline-block; margin: 0 10px; padding: 12px 24px; background-color: #2d3748; color: white; text-decoration: none; border-radius: 8px; font-weight: 500; transition: background-color 0.3s ease;">Instagram</a>
                                </div>
                            </div>
                            <div style="text-align: center; color: #999; font-size: 12px; margin-top: 30px;">
                                <p>
                                    Cet e-mail a été envoyé à ${userInput.email}.<br>
                                    © 2024 QYPYM. Tous droits réservés.
                                </p>
                            </div>
                        </div>
                    `,
                    text: `
                        Bienvenue chez QYPYM !
                        
                        Nous vous remercions d'avoir rejoint la liste d'attente QYPYM ! Nous sommes ravis de vous compter parmi nos premiers membres.
                        
                        ${userInput.sportsLiked.length > 0
                                        ? `Votre passion pour ${userInput.sportsLiked.join(' et ')} nous inspire à créer une expérience sportive encore meilleure.`
                                        : 'Votre intérêt pour le sport connecté nous inspire à créer une expérience unique.'}
                        
                        Restez à l'écoute ! Nous vous tiendrons informé(e) des développements passionnants à venir.
                        
                        Sportivement,
                        L'équipe QYPYM
                    `
                }
            };
            await addDoc(mailRef, emailData);
            if (window.gtag && trackingData) {
                window.gtag('event', 'signup', {
                    utm_source: trackingData.s,
                    utm_medium: trackingData.m,
                    utm_campaign: trackingData.c,
                });
            }
            setUserInput({
                email: "",
                sportsLiked: [],
                foundUs: "other"
            });

            toast.success('Merci pour votre inscription ! Un email de confirmation vous a été envoyé.', {
                duration: 5000,
            });

            console.log('Submission successful:', docRef.id);

        } catch (error) {
            console.error('Submission error:', error);
            const errorMessage = handleFirebaseError(error);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const smoothScroll = useSpring(pageScroll, {damping: 40,stiffness: 100,});
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
                                            disabled={isLoading}
                                            className="w-full px-4 py-3 rounded-lg bg-[#12141A] border border-neutral-800 text-neutral-100 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-colors disabled:opacity-50"
                                            placeholder="votre@email.fr"
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
                                                    disabled={isLoading}
                                                    onClick={() => pickSport(sport)}
                                                    className={`px-4 py-2 rounded-full border transition-all disabled:opacity-50 ${
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
                                            disabled={isLoading}
                                            className="w-full px-4 py-3 rounded-lg bg-[#12141A] border border-neutral-800 text-neutral-100 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition-colors disabled:opacity-50"
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
                                            disabled={isLoading}
                                            className="w-full bg-gradient-to-r from-brand-accent to-brand-hover text-black font-semibold py-4 px-8 rounded-lg transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                                                    Inscription en cours...
                                                </>
                                            ) : (
                                                "Rejoindre la liste d'attente"
                                            )}
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