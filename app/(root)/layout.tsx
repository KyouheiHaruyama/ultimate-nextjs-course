import { ReactNode } from 'react'
import Navbar from "@/components/navigation/navbar";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    )
}
export default AuthLayout
