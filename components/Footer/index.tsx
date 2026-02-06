import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import styles from "./styles.module.css";
import { AudiowaveText } from "@/components/AudiowaveText";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.column + " " + styles.logoColumn}>
                        <Image
                            src="/logo_sub_text_light.png"
                            alt="Appibara Logo"
                            width={200}
                            height={50}
                            className={styles.logo}
                        />
                        <p className="font-audiowide text-sm text-gray-500">
                            Calm tech for complex needs
                        </p>
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

                    <div className={styles.column}>
                        <AudiowaveText className="text-xl">Company</AudiowaveText>
                        <a
                            href="/#who-we-are"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            About Us
                        </a>
                        <a
                            href="/#our-services"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            Services
                        </a>
                        <a
                            href="/#our-products"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            Products
                        </a>
                    </div>
                    <div className={styles.column}>
                        <AudiowaveText className="text-xl">Legal</AudiowaveText>
                        <a
                            href="/terms-and-conditions"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            Terms and Conditions
                        </a>
                        <a
                            href="/privacy-policy"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/cookie-policy"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            Cookie Policy
                        </a>
                    </div>
                    <div className={styles.column}>
                        <AudiowaveText className="text-xl">Contact</AudiowaveText>
                        <a
                            href="mailto:contact@appibara.com"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            <MapPin className="w-4 h-4 self-start mt-1" />
                            Unit 501 Leroy House, 434-436 Essex Road, London, England, N1 3FY
                        </a>
                        <a
                            href="mailto:contact@appibara.com"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            <Mail className="w-4 h-4" />
                            contact@appibara.com
                        </a>
                    </div>

                </div>

                <div className={styles.bottom}>
                    <div className="font-nunito">
                        © {new Date().getFullYear()} Appibara LTD. All rights reserved.
                    </div>
                    <div className={styles.links}>
                        <Link href="/terms-and-conditions" className={styles.link + " font-nunito"}>
                            Terms and Conditions
                        </Link>
                        <Link href="/privacy-policy" className={styles.link + " font-nunito"}>
                            Privacy Policy
                        </Link>
                        <Link href="/cookie-policy" className={styles.link + " font-nunito"}>
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
