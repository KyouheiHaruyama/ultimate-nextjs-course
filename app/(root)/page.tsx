import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {auth} from "@/auth";

const Home = async () => {
    const session = await auth();

    console.log(session);

    return (
        <>
            <h1 className="h1-bold font-inter">Welcome to Next.js 👋</h1>
        </>
    );
}

export default Home;