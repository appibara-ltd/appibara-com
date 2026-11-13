"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

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
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (delay > 0) {
                        timeoutId = setTimeout(() => {
                            setIsVisible(true);
                        }, delay * 1000);
                    } else {
                        setIsVisible(true);
                    }
                    observer.unobserve(element);
                }
            },
            { rootMargin: "-50px" }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [delay]);

    return (
        <section
            ref={ref}
            className={cn(styles.motionSection, isVisible && styles.visible, className)}
            {...props}
        >
            {children}
        </section>
    );
};
