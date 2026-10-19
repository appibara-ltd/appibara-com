import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    noWrap?: boolean;
}

export const PrimaryButton = ({
    href,
    icon,
    children,
    className,
    noWrap = true,
    ...props
}: PrimaryButtonProps) => {
    return (
        <Link
            href={href}
            className={cn(
                styles.button,
                "inline-flex items-center justify-center gap-2 py-3 px-4 md:px-6 rounded-lg text-white font-medium text-sm md:text-base transition-transform hover:scale-105 active:scale-95 shadow-sm whitespace-nowrap shrink-0",
                noWrap === false && "!whitespace-normal",
                className
            )}
            {...props}
        >
            <span className={cn("inline-block", noWrap !== false && "whitespace-nowrap")}>
                {children}
            </span>
            {icon && <span className="flex-shrink-0">{icon}</span>}
        </Link>
    );
};
