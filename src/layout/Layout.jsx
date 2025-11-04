import {Outlet} from "react-router";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { Toaster } from "sonner";
export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col md:flex-row ">
                <Sidebar />
                <main className="flex-grow p-6 overflow-y-auto bg-white shadow-inner">
                    <div className="min-h-screen">
                      <Outlet />
                    </div>
                </main>
            </div>
            <Footer />

            <Toaster
                richColors
                position="top-center"
                toastOptions={{
                    style: {
                        fontSize: "1.1rem",
                        fontWeight: 500,
                    },
                }}
            />
        </div>
    )
}
