'use client';

import React, {useEffect, useRef, useState} from 'react'
import {Input} from "@/components/ui/input";
import Image from "next/image";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import {formUrlQuery, removeKeysFromQuery} from "@/lib/url";

interface LocalSearchProps {
    route: string;
    imgSrc: string;
    placeholder: string;
    otherClasses?: string;
    iconPosition?: "left" | "right";
}

const LocalSearch = ({
     route,
     imgSrc,
     placeholder,
     otherClasses,
     iconPosition = "left",
}: LocalSearchProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || "";

    const [search, setSearch] = useState(query || "");
    const previousSearchRef = useRef(search);

    useEffect(() => {
        // Only trigger if search actually changed
        if (previousSearchRef.current === search) return;

        previousSearchRef.current = search;

        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "query",
                    value: search,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["query"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, router, route, searchParams, pathname]);

    return (
        <div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
            {iconPosition === "left" && <Image
                src={imgSrc}
                width={24}
                height={24}
                alt="Search"
                className="cursor-pointer"
            />}

            <Input
                type="text"
                placeholder={placeholder}
                value={search}
                className="paragraph-regular no-focus placeholder text-dark400_light700 border-none shadow-none outline-none"
                onChange={(e) => setSearch(e.target.value)}
            />

            {iconPosition === "right" && <Image
                src={imgSrc}
                width={15}
                height={15}
                alt="Search"
                className="cursor-pointer"
            />}
        </div>
    )
}
export default LocalSearch
