import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Card = ({ children, className, ...props }: CardProps) => {
    return (
        <div className={cn(styles.card, className)} {...props}>
            {children}
        </div>
    );
};
