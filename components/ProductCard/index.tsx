import React from "react";
import { AudiowaveText } from "@/components/AudiowaveText";
import { Pill } from "@/components/Pill";
import { PrimaryButton } from "@/components/PrimaryButton";

interface ProductCardProps {
    title: string;
    description: string;
    href: string;
    buttonText?: string;
    tags?: string[];
}

export const ProductCard = ({
    title,
    description,
    href,
    buttonText = "Try Now",
    tags = []
}: ProductCardProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center gap-[2rem] border border-gray-200 rounded-[1rem] p-8 w-full">
            <div className="text-left flex flex-col gap-[1rem]">
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
            <PrimaryButton className="w-[200px] h-[50px] flex-shrink-0" href={href} noWrap>
                {buttonText}
            </PrimaryButton>
        </div>
    );
};
