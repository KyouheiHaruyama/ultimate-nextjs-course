import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {SidebarNavLinks} from "@/components/navigation/sidebar/SidebarNavLinks";
import Image from "next/image";
import Link from "next/link";
import {ROUTES} from "@/constants/routes";
import {Button} from "@/components/ui/button";

const LeftSidebar = () => {
    return (
        <Sidebar className="background-light900_dark200 z-50 h-full p-6 shadow-light-300 dark:shadow-none">
            <SidebarContent className="background-light900_dark200 border-none">
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Link href="/" className="flex items-center gap-1">
                            <Image
                                src="/images/site-logo.svg"
                                width={23}
                                height={23}
                                alt="Logo"
                            />

                            <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900">
                                Dev<span className="text-primary-500">OverFlow</span>
                            </p>
                        </Link>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex h-full flex-col gap-6 pt-16">
                            <SidebarNavLinks />
                        </SidebarMenu>

                        <SidebarMenu className="flex h-full flex-col gap-6 pt-16">
                            <SidebarMenuItem>
                                <Link href={ROUTES.HOME}>
                                    <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                                        Log out
                                    </Button>
                                </Link>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default LeftSidebar;