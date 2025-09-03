import { ReactNode } from 'react'
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";

import Navbar from "@/components/navigation/navbar";
import LeftSidebar from "@/components/navigation/sidebar/LeftSidebarNavigation";

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider>
            <LeftSidebar />
            <main>
                <Navbar />
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
export default HomeLayout
