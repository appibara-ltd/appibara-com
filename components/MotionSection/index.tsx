"use client";

import { motion } from "framer-motion";
import React from "react";

interface MotionSectionProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    delay?: number;
}

export const MotionSection = ({
    children,
    className,
    delay = 0,
    ...props
}: MotionSectionProps) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
            className={className}
            {...props as any}
        >
            {children}
        </motion.section>
    );
};
