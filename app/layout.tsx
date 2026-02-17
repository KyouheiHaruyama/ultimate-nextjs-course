import type { Metadata } from "next";
import React, {ReactNode} from "react";

import "./globals.css";
import ThemeProvider from "@/context/Theme";
import { Toaster } from "@/components/ui/sonner"
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";
import localFont from "next/font/local";

const inter = localFont({
    src: "./fonts/InterVF.ttf",
    variable: "--font-inter",
    weight: '100 200 300 400 500 600 700 800 900',
});

const spaceGrotesk = localFont({
    src: "./fonts/SpaceGroteskVF.ttf",
    variable: "--font-space-grotesk",
    weight: '300 400 500 600 700',
});

export const metadata: Metadata = {
    title: "Dev Overflow – StackOverflow Clone Built with Next.js",
    description:
        "Dev Overflow is a modern Q&A platform for developers, inspired by StackOverflow and built with Next.js. Ask questions, share answers, and collaborate with devs worldwide in a fast, responsive interface.",
    icons: {
        icon: "/images/site-logo.svg",
    },
};

const RootLayout = async ({ children }: { children: ReactNode; }) => {
    const session = await auth();
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
            </head>
            <SessionProvider session={session}>
                <body className={`${inter.className} ${spaceGrotesk.variable} antialiased`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                    <Toaster />
                </body>
            </SessionProvider>
        </html>
    );
}

export default RootLayout;