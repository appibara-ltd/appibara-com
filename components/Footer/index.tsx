import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import styles from "./styles.module.css";
import { AudiowaveText } from "@/components/AudiowaveText";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.column + " " + styles.logoColumn}>
                        <Image
                            src="/appibara_logo.png"
                            alt="Appibara Logo"
                            width={200}
                            height={50}
                            className={styles.logo}
                        />
                        <p className="font-audiowide text-sm text-gray-500">
                            Calm tech for complex needs
                        </p>
                    </div>

                    <div className={styles.column}>
                        <AudiowaveText className="text-xl">Contact</AudiowaveText>
                        <a
                            href="mailto:contact@appibara.com"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            contact@appibara.com
                        </a>
                    </div>

                    <div className={styles.column}>
                        <AudiowaveText className="text-xl">Follow Us</AudiowaveText>
                        <div className={styles.socialIcons}>
                            <Link href="#" className={styles.socialIcon}>
                                <Twitter />
                            </Link>
                            <Link href="#" className={styles.socialIcon}>
                                <Facebook />
                            </Link>
                            <Link href="#" className={styles.socialIcon}>
                                <Linkedin />
                            </Link>
                            <Link href="#" className={styles.socialIcon}>
                                <Instagram />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className="font-nunito">
                        © 2026 Appibara LTD. All rights reserved.
                    </div>
                    <div className={styles.links}>
                        <Link href="#" className={styles.link + " font-nunito"}>
                            Terms and Conditions
                        </Link>
                        <Link href="#" className={styles.link + " font-nunito"}>
                            Privacy Policy
                        </Link>
                        <Link href="#" className={styles.link + " font-nunito"}>
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
