"use client";

import React from 'react'
import Image from "next/image"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { ROUTES } from "@/constants/routes";
import { signIn } from "next-auth/react";

const SocialAuthForm = () => {
    const buttonClass = "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

    const handleSignIn = async (provider: "github" | "google") => {
        try {
            "use server";
            await signIn(provider, { redirectTo: ROUTES.HOME });
        } catch (error) {
            console.log(error);

            toast("Sign-in Failed", {
                description: error instanceof Error ? error.message : "An error occurred during sign-in"
            })
        }
    };

    return (
        <div className="mt-10 flex flex-wrap gap-2.5">
            <Button className={buttonClass} onClick={() => handleSignIn('github')}>
                <Image
                    src="/icons/github.svg"
                    alt="Github Logo"
                    width={20}
                    height={20}
                    className="invert-colors mr-2.5 object-contain"
                />
                Log in with Github
            </Button>

            <Button className={buttonClass} onClick={() => handleSignIn('google')}>
                <Image
                    src="/icons/google.svg"
                    alt="Google Logo"
                    width={20}
                    height={20}
                    className="mr-2.5 object-contain"
                />
                Log in with Google
            </Button>
        </div>
    )
}
export default SocialAuthForm
