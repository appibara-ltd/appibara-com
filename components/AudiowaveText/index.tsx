import { cn } from "@/lib/utils";
import React from "react";
import styles from "./styles.module.css";

interface AudiowaveTextProps extends React.HTMLAttributes<HTMLSpanElement> {
    children?: React.ReactNode;
    useGradient?: boolean;
}

export const AudiowaveText = ({
    children,
    className,
    useGradient = true,
    ...props
}: AudiowaveTextProps) => {
    return (
        <span
            className={cn("font-audiowide", useGradient ? styles.gradientText : styles.defaultText, className)}
            {...props}
        >
            {children}
        </span>
    );
};
