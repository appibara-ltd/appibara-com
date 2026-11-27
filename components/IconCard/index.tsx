import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";
import { DuoIcon, type DuoIconDefinition } from "@/components/DuoIcon";

interface IconCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: DuoIconDefinition;
}

export const IconCard = ({ icon, className, ...props }: IconCardProps) => {
    return (
        <div className={cn(styles.card, className)} {...props}>
            <DuoIcon icon={icon} className={styles.icon} />
        </div>
    );
};
