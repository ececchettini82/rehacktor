import { useContext } from "react";
import {Link} from "react-router";
import SessionContext from "../context/SessionContext";
export default function Footer() {

    const { session, signOut } = useContext(SessionContext);

    return (
        <footer className="bg-black text-white shadow">
            <div className="container mx-auto px-4 py-6 flex justify-end">
                <nav className="flex list-none flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-right">
                    {session ? (
                        <>
                        <li>
                            <Link
                                to="/account"
                                className="cursor-pointer block hover:text-blue-400 transition"
                            >
                                Il mio profilo
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/profile"
                                className="cursor-pointer block hover:text-blue-400 transition"
                            >
                                I miei preferiti
                            </Link>
                        </li>
                        <li>
                            <button
                                className="cursor-pointer block w-full text-left text-white-400 hover:text-red-500 transition"
                                onClick={async () => {
                                    await signOut();
                                }}
                            >
                                Logout
                            </button>
                        </li>
                        </>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/register"
                                        className="cursor-pointer block hover:text-blue-400 transition"
                                    >
                                        Registrati
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="cursor-pointer block hover:text-blue-400 transition"
                                    >
                                        Accedi
                                    </Link>
                                </li>
                            </>
                        ) }
                </nav>
            </div>

            <div className="text-center text-gray-400 text-sm mt-4 pb-4">
                &copy; {new Date().getFullYear()} Reahacktor. All rights reserved.
            </div>
        </footer>
    );
}
