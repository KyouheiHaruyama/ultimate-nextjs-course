"use client";

import React from 'react'
import {sidebarLinks} from "@/constants";
import {usePathname} from "next/navigation";
import Link from "next/link";
import Image from "next/image"
import {cn} from "@/lib/utils";
import {SheetClose} from "@/components/ui/sheet";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/components/ui/sidebar";

export const SidebarNavLinks = () => {
    const pathname = usePathname();
    const userId = 1;

    return (
        <>
            {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

                if (item.route === "/profile") {
                    if (userId) item.route = `${item.route}/${userId}`;
                    // else return null;
                }

                const LinkComponent = (
                    <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                            isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900",
                            "flex items-center justify-start gap-4 bg-transparent p-4"
                        )}
                    >
                        <Image
                            src={item.imageURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({ "invert-colors": !isActive })}
                        />
                        <p className={cn(
                            isActive ? "base-bold" : "base-medium"
                        )}>{item.label}</p>
                    </Link>
                );

                return (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton asChild>
                            {LinkComponent}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            })}
        </>
    );
}

