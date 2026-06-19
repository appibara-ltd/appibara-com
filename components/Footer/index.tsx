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
                            <Link href="https://x.com/AppibaraLTD" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Appibara on X (formerly Twitter)">
                                <svg className="w-[28px] h-[28px]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </Link>
                            <Link href="http://linkedin.com/company/appibara-ltd" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Appibara on LinkedIn">
                                <svg className="w-[28px] h-[28px]"><path fill="#0a66c2" d="m25.9 0h-23.8c-1.2 0-2.1 0.9-2.1 2v24c0 1.1 0.9 2 2.1 2h23.9c1.1 0 2.1-0.9 2.1-2v-24c-0.1-1.1-1-2-2.2-2zm-17.6 23.9h-4.1v-13.4h4.2v13.4zm-2.1-15.2c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4-1 2.4-2.4 2.4zm17.7 15.2h-4.1v-6.5c0-1.5 0-3.5-2.2-3.5s-2.5 1.7-2.5 3.4v6.6h-4.1v-13.4h4v1.8h0.1c0.6-1 1.9-2.2 3.9-2.2 4.2 0 5 2.8 5 6.4v7.4z"></path></svg>
                            </Link>
                            <Link href="https://bsky.app/profile/appibara.com" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Appibara on Bluesky">
                                <svg fill="none" viewBox="0 0 64 57" width="30" style={{
                                    width: "30px",
                                    height: "26.7188px"
                                }}><path fill="#0F73FF" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825-18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>
                            </Link>
                            <Link href="https://www.instagram.com/appibara_ltd" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Appibara on Instagram">
                                <svg className="w-[28px] h-[28px]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </Link>
                            <Link href="https://appibara.medium.com/" className={styles.socialIcon} target="_blank" rel="noopener noreferrer" aria-label="Appibara on Medium">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 1024 1024" fill="none">
                                    <rect width="1024" height="1024" rx="179.649" fill="black" />
                                    <path d="M1024 704.736V797.736C1018.16 798.3 1012.16 798.588 1006 798.588C896.061 798.588 834.166 707.016 831.497 592.432C831.418 588.002 831.448 583.6 831.546 579.228C831.606 576.501 831.714 573.783 831.852 571.075C831.921 569.628 831.989 568.269 832.098 566.753C832.206 565.236 832.315 563.72 832.443 562.204C836.401 511.613 852.687 466.594 879.568 433.284C896.267 412.606 916.334 396.852 939.09 386.316C959.078 376.253 987.17 370.699 1010.07 370.699H1011.06C1015.4 370.699 1019.71 370.844 1024 371.13V396.717C1019.45 395.47 1014.58 394.801 1009.4 394.715C963.086 395.67 935.486 451.145 932.049 528.007H1024V549.669H929.972L929.942 549.689C925.703 624.579 966.692 687.87 1024 704.736Z" fill="white" />
                                    <path d="M836.115 244.625L836.923 244.448V238.195H672.014L518.891 598.084L365.768 238.195H188.059V244.448L188.857 244.625C218.957 251.419 234.239 261.551 234.239 298.091V725.872C234.239 762.412 218.898 772.544 188.798 779.338L188 779.516V785.788H308.57V779.535L307.773 779.358C277.672 772.564 262.39 762.432 262.39 725.892V322.905L459.093 785.788H470.249L672.683 309.996V736.457C670.104 765.317 654.96 774.228 627.705 780.382L626.897 780.569V786.773H836.923V780.569L836.115 780.382C808.831 774.228 793.322 765.317 790.743 736.457L790.605 298.091H790.743C790.743 261.551 806.024 251.419 836.115 244.625Z" fill="white" />
                                </svg>
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
                        <a
                            href="/blog"
                            className="flex items-center gap-2 font-nunito hover:text-[#e17100] transition-colors text-[0.85rem]"
                        >
                            Blog
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
