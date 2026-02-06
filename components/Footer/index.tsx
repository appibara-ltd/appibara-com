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
                            <Link href="https://x.com/AppibaraLTD" className={styles.socialIcon}>
                                <img src="https://about.x.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png" style={{ height: "28px", width: 'auto', }} />
                            </Link>
                            <Link href="http://linkedin.com/company/appibara-ltd" className={styles.socialIcon}>
                                <svg className="w-[28px] h-[28px]"><path fill="#0a66c2" d="m25.9 0h-23.8c-1.2 0-2.1 0.9-2.1 2v24c0 1.1 0.9 2 2.1 2h23.9c1.1 0 2.1-0.9 2.1-2v-24c-0.1-1.1-1-2-2.2-2zm-17.6 23.9h-4.1v-13.4h4.2v13.4zm-2.1-15.2c-1.3 0-2.4-1.1-2.4-2.4s1.1-2.4 2.4-2.4 2.4 1.1 2.4 2.4-1 2.4-2.4 2.4zm17.7 15.2h-4.1v-6.5c0-1.5 0-3.5-2.2-3.5s-2.5 1.7-2.5 3.4v6.6h-4.1v-13.4h4v1.8h0.1c0.6-1 1.9-2.2 3.9-2.2 4.2 0 5 2.8 5 6.4v7.4z"></path></svg>
                            </Link>
                            <Link href="https://bsky.app/profile/appibara.com" className={styles.socialIcon}>
                                <svg fill="none" viewBox="0 0 64 57" width="30" style={{
                                    width: "30px",
                                    height: "26.7188px"
                                }}><path fill="#0F73FF" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>
                            </Link>
                            <Link href="https://www.instagram.com/appibara_ltd" className={styles.socialIcon}>
                                <img src="https://scontent.fist4-1.fna.fbcdn.net/v/t39.8562-6/452615141_1867050850474850_3818297208510997530_n.png?_nc_cat=107&amp;ccb=1-7&amp;_nc_sid=f537c7&amp;_nc_ohc=ntiC7UOb9cIQ7kNvwE6_own&amp;_nc_oc=AdmabGsXh3MSNsjwK2MYO1GUwfNK881FFnQ_2TER33gj33ej_SdhJbGovyGVDRfb-JU&amp;_nc_zt=14&amp;_nc_ht=scontent.fist4-1.fna&amp;_nc_gid=RgE-7zNhJLVDbliG0fbc4w&amp;oh=00_Afv-xQZJ3rMrlDAuc-ex8Dv7jEBpQ7Uf5QsJKUPz6d52Bw&amp;oe=698BE9FB" alt=""></img>
                            </Link>
                            <Link href="https://appibara.medium.com/" className={styles.socialIcon}>
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
