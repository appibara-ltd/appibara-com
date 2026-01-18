import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: LucideIcon;
}

export const IconCard = ({ icon: Icon, className, ...props }: IconCardProps) => {
    return (
        <div className={cn(styles.card, className)} {...props}>
            <Icon className={styles.icon} />
        </div>
    );
};
