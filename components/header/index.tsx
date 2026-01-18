import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { Box, Briefcase, Home, Mail, Users } from "lucide-react";
import { ReactNode } from "react";

function ListItem({
  title,
  children,
  href,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"li">, "title"> & {
  href: string;
  title?: ReactNode;
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{children}</div>
          {/* <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p> */}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Image
          className="block dark:hidden max-w-3xl w-full"
          src="/appibara_logo.png"
          alt="Appibara Logo"
          width={254}
          height={64}
        />
        <NavigationMenu>
          <NavigationMenuList>
            <ListItem href={"/"}>
              <div className={styles.item}>
                <Home color="var(--foreground)" /> Home
              </div>
            </ListItem>
            <ListItem href={"/"}>
              <div className={styles.item}>
                <Users color="var(--foreground)" /> Who we are
              </div>
            </ListItem>
            <ListItem href={"/"}>
              <div className={styles.item}>
                <Briefcase color="var(--foreground)" /> Our services
              </div>
            </ListItem>
            <ListItem href={"/"}>
              <div className={styles.item}>
                <Box color="var(--foreground)" /> Our Products
              </div>
            </ListItem>
            <ListItem href={"/"}>
              <div className={styles.item}>
                <Mail color="var(--foreground)" /> Contact
              </div>
            </ListItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
