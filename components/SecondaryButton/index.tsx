import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}

export const SecondaryButton = ({
    href,
    icon,
    children,
    className,
    ...props
}: SecondaryButtonProps) => {
    return (
        <Link
            href={href}
            className={cn(
                styles.button,
                "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-nunito font-medium transition-all hover:scale-105 active:scale-95 shadow-sm",
                className
            )}
            {...props}
        >
            {children}
            {icon && <span className="flex-shrink-0">{icon}</span>}
        </Link>
    );
};
