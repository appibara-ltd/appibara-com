"use client";

import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    noWrap?: boolean;
}

export const SecondaryButton = ({
    href,
    icon,
    children,
    className,
    noWrap = true,
    onClick,
    ...props
}: SecondaryButtonProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        const isSamePageHash =
            href.startsWith("#") ||
            (href.startsWith("/#") && window.location.pathname === "/");

        if (isSamePageHash) {
            const hash = href.replace(/^\//, "");
            const targetId = hash.substring(1);
            const element = document.getElementById(targetId);

            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: "smooth" });
                if (window.location.hash !== hash) {
                    window.history.pushState(null, "", hash);
                }
            }
        }
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={cn(
                styles.button,
                "inline-flex items-center justify-center gap-2 py-3 px-4 md:px-6 rounded-lg font-nunito font-medium text-sm md:text-base transition-all hover:scale-105 active:scale-95 shadow-sm whitespace-nowrap shrink-0",
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
