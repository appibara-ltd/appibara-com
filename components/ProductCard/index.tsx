import Image from "next/image";
import { AudiowaveText } from "@/components/AudiowaveText";
import { Pill } from "@/components/Pill";
import { PrimaryButton } from "@/components/PrimaryButton";

interface ProductCardProps {
    title: string;
    description: string;
    href: string;
    buttonText?: string;
    tags?: string[];
    logoUrl?: string;
}

export const ProductCard = ({
    title,
    description,
    href,
    buttonText = "Try Now",
    tags = [],
    logoUrl
}: ProductCardProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-[2rem] border border-gray-200 rounded-[1rem] p-8 w-full">
            {logoUrl && (
                <div className="flex-shrink-0 bg-gray-50 p-4 rounded-xl border border-gray-100 self-start">
                    <Image
                        src={logoUrl}
                        alt={`${title} Logo`}
                        width={64}
                        height={64}
                        className="w-16 h-16 object-contain"
                    />
                </div>
            )}
            <div className="text-left flex flex-col gap-[1rem] flex-1">
                <div className="flex flex-col gap-[.125rem]">
                    <AudiowaveText className="text-[20px]" useGradient={false}>{title}</AudiowaveText>
                    <p className="text-[1rem] font-nunito text-gray-700">
                        {description}
                    </p>
                </div>
                {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {tags.map((tag, index) => (
                            <Pill key={index}>{tag}</Pill>
                        ))}
                    </div>
                )}
            </div>
            <PrimaryButton className="w-[200px] h-[50px] flex-shrink-0 not-md:self-start" href={href} noWrap>
                {buttonText}
            </PrimaryButton>
        </div>
    );
};
