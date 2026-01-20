"use client";

import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { Box, Briefcase, Home, Mail, Users, Menu, X } from "lucide-react";
import { ReactNode, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ... (ListItem component remains unchanged)

interface ListItemProps extends Omit<React.ComponentPropsWithoutRef<"li">, "title" | "onClick"> {
  href: string;
  title?: ReactNode;
  onClick?: () => void;
}

function ListItem({
  title,
  children,
  href,
  onClick,
  ...props
}: ListItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();

    // Check if it's a hash link
    if (href.startsWith("/#") || href.startsWith("#")) {
      const hash = href.replace(/^\//, ""); // remove leading / if starts with /#
      const targetId = hash.substring(1); // remove #
      const element = document.getElementById(targetId);

      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without scroll
        window.history.pushState(null, "", hash);
      }
    }
  };

  return (
    <li {...props} className="w-full lg:w-auto">
      <NavigationMenuLink asChild>
        <Link href={href} onClick={handleClick} className="block w-full">
          <div className={cn("text-sm leading-none font-medium flex items-center gap-2 py-2 md:py-0")}>
            {children}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen(s => !s), []);

  return (
    <div className={styles.container}>
      <div
        className={cn(styles.header, "transition-shadow duration-300", {
          "shadow-[0px_25px_50px_-12px_var(--shadow-color)]": hasScrolled,
          "bg-[color-mix(in_srgb,var(--surface-off-white),transparent_15%)]": hasScrolled,
        })}
      >
        <Link href={"/"} className="cursor-pointer select-none">
          <div className="flex items-center">
            <Image
              className="block dark:hidden w-16 h-16"
              src="/appibara_icon.png"
              alt="Appibara Logo"
              width={64}
              height={64}
            />
            <p className={cn("transition-all duration-300 text-[1.55rem] font-audiowide font-bold", {
              "text-[1.75rem] mb-[-10px]": hasScrolled,
              "ml-[-.5rem] mb-[-22px]": !hasScrolled,
            })}>Appibara LTD</p>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button className="lg:hidden p-2" onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <ListItem href={"/#home"}>
              <Home color="var(--foreground)" /> Home
            </ListItem>
            <ListItem href={"/#who-we-are"}>
              <Users color="var(--foreground)" /> Who we are
            </ListItem>
            <ListItem href={"/#our-services"}>
              <Briefcase color="var(--foreground)" /> Our services
            </ListItem>
            <ListItem href={"/#our-products"}>
              <Box color="var(--foreground)" /> Our Products
            </ListItem>
            <ListItem href={"/#contact"}>
              <Mail color="var(--foreground)" /> Contact
            </ListItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="absolute top-[calc(100%+1rem)] left-0 right-0 bg-[#fdfdfc] p-4 mt-0 m-8 rounded-xl shadow-xl lg:hidden flex flex-col gap-4 border border-gray-100 z-50">

            <NavigationMenu className="flex flex-col gap-2 w-full max-w-none justify-stretch items-stretch">
              <NavigationMenuList className="flex flex-col gap-2 w-full">
                <ListItem href={"/#home"} onClick={toggleMenu}>
                  <Home className="w-5 h-5" color="var(--foreground)" /> Home
                </ListItem>
                <ListItem href={"/#who-we-are"} onClick={toggleMenu}>
                  <Users className="w-5 h-5" color="var(--foreground)" /> Who we are
                </ListItem>
                <ListItem href={"/#our-services"} onClick={toggleMenu}>
                  <Briefcase className="w-5 h-5" color="var(--foreground)" /> Our services
                </ListItem>
                <ListItem href={"/#our-products"} onClick={toggleMenu}>
                  <Box className="w-5 h-5" color="var(--foreground)" /> Our Products
                </ListItem>
                <ListItem href={"/#contact"} onClick={toggleMenu}>
                  <Mail className="w-5 h-5" color="var(--foreground)" /> Contact
                </ListItem>
              </NavigationMenuList>
            </NavigationMenu>

          </div>
        )}
      </div>
    </div>
  );
};
