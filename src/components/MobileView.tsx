'use client';
import {motion, MotionValue, useSpring, useTransform} from "framer-motion";
import Image from "next/image";

type PhoneProps = {
    scale: MotionValue<number>;
    y: MotionValue<number>;
}

export const MobileView = ({scale: scale, y}: PhoneProps) => {
    const springOptions = {
        damping: 30,
        stiffness: 100,
        mass: 1.5
    };

    const smoothPhoneScale = useSpring(scale, springOptions);
    const smoothPhoneY = useSpring(y, springOptions);

    const floatY = useTransform(
        smoothPhoneY,
        (value) => value + Math.sin(Date.now() * 0.001) * 5
    );

    return (
        <motion.div
            className="relative z-20 -mt-32"
            style={{
                scale: smoothPhoneScale,
                y: floatY,
                willChange: "transform"
            }}
            initial={false}
        >
            <div className="relative">
                <div
                    className="absolute -inset-4 bg-gradient-to-b from-brand-accent/10 to-transparent blur-2xl rounded-3xl opacity-20"
                />
                <Image
                    src="/images/primary.png"
                    alt="QYPYM App Preview"
                    width={450}
                    height={800}
                    priority
                    className="relative transform rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:brightness-110"
                    quality={90}
                    loading="eager"
                />
            </div>
        </motion.div>
    );
};