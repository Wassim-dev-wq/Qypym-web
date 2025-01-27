'use client';
import {motion, useSpring} from "framer-motion";
import Image from "next/image";
import { MotionValue } from "framer-motion";

type PhoneProps = {
    scale: MotionValue<number>;
    y: MotionValue<number>;
}

export const MobileView = ({scale: scale, y}: PhoneProps) => {
    const smoothTransition = {damping: 50, stiffness: 200};
    const smoothPhoneScale = useSpring(scale, smoothTransition);
    const smoothPhoneY = useSpring(y, smoothTransition);

    return (
        <motion.div
            className="relative z-20"
            style={{
                scale: smoothPhoneScale,
                y: smoothPhoneY
            }}
        >
            <motion.div
                animate={{y: [-5, 5, -5]}}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <div className="relative">
                    <div
                        className="absolute -inset-4 bg-gradient-to-b from-brand-accent/10 to-transparent blur-2xl rounded-3xl opacity-30"/>
                    <Image
                        src="/images/primary.png"
                        alt="QYPYM App Preview"
                        width={340}
                        height={680}
                        priority
                        className="relative transform hover:scale-105 transition-all duration-500 hover:brightness-110 rounded-3xl shadow-2xl"
                        quality={100}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};