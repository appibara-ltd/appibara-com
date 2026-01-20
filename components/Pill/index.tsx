import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

interface PillProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Pill = ({ children, className, ...props }: PillProps) => {
    return (
        <div className={cn(styles.pill, className)} {...props}>
            {children}
        </div>
    );
};
