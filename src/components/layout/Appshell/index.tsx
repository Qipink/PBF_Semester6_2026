import { useRouter } from "next/router";
import Footer from "../footer";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";

const disableNavbar = ['/auth/login', '/auth/register', '/404'];

type AppShellProps = {
    children: React.ReactNode;
}

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
})

const Navbar = dynamic(() => import("../navbar"), {
    ssr: false,
});

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    const { pathname } = useRouter();
    const router = useRouter();
    console.log(router);

    return (
        <main className={roboto.className}>
            {!disableNavbar.includes(pathname) && <Navbar/>}
            {children}

        </main>
    );
};

export default AppShell;
