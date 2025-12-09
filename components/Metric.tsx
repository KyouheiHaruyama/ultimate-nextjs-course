import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";

interface MetricProps {
    imageURL: string;
    alt: string;
    value: string | number;
    title: string;
    href?: string;
    textStyles?: string;
    imageStyles?: string;
    isAuthor?: boolean;
    titleStyles?: string;
}

const Metric = ({
    imageURL, alt, value, title, href, textStyles, imageStyles, isAuthor, titleStyles
}: MetricProps) => {
    const metricContent = (
        <>
            <Image src={imageURL || "/icons/avatar.svg"} width={16} height={16} alt={alt} className={`rounded-full object-contain ${imageStyles}`} />

            <p className={`${textStyles} flex items-center gap-1`}>
                {value}

                {title ?
                    <span className={cn(`small-regular line-clamp-1`, titleStyles)}>
                        {title}
                    </span>
                    : null
                }
            </p>
        </>
    );
    return href ? (
        <Link href={href} className="flex-center gap-1">{metricContent}</Link>
    ) : (
        <div className="flex-center gap-1">{metricContent}</div>
    )
}
export default Metric
