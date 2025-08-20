import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {auth, signOut} from "@/auth";
import {Button} from "@/components/ui/button";
import {ROUTES} from "@/constants/routes";

const Home = async () => {
    const session = await auth();

    console.log(session);

    return (
        <>
            <h1 className="h1-bold font-inter">Welcome to Next.js 👋</h1>

            <form className="px-10 pt-[100px]" action={async () => {
                "use server";
                await signOut({ redirectTo: ROUTES.SIGN_IN });
            }}>
                <Button type="submit">Log out</Button>
            </form>
        </>
    );
}

export default Home;