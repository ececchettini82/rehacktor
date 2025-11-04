import { useContext, useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import SearchBar from "./SearchBar";
import SessionContext from "../context/SessionContext";
export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { session, signOut } = useContext(SessionContext);

/* spostato nel context
    const navigate = useNavigate();
    const getSession = async () => {
        const { data, error } = await supabase.auth.getSession();
        if (error) setSession(null)
        if(data.session){
            console.log(data.session)
            setSession(data.session)
        }else{
            setSession(null);
        }
    };

        useEffect(() => {
        getSession(); // prende sessione iniziale
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session); //  aggiorna in tempo reale
        });
    }, []);


    const signOut = async () => {
        const {error } = await supabase.auth.signOut();
        if (error) console.log(error);
        alert("Logout avvenuto 👍🏻!");
        setIsOpen(false);
       // getSession();
        navigate("/");
    };
 */

    return (

        <header className="bg-black text-white shadow sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to={`/`}>
                     <img src="/logo.jpg" alt="Logo Reahacktor" className="w-48" />
                </Link>
                <div className="hidden md:w-48 lg:w-lg md:block">
                    <SearchBar />
                </div>

                {/* Menu Desktop */}
                <nav className="hidden md:flex space-x-6 items-center relative">

                    {/* Dropdown Account */}
                    <div id="dropdown" className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="cursor-pointer hover:text-blue-200 flex items-center gap-1 focus:outline-none"
                        >
                            { session ? `Ciao ${session.user.user_metadata.username}` : "Entra nel club"}
                            {console.log (session)}
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${
                                    isOpen ? "rotate-180" : "rotate-0"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        <div
                            className={`absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg transition-all duration-200 z-50 ${
                                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                            }`}
                        >
                            {session ? (
                                <>
                                    <Link to="/account"
                                        className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Il mio profilo
                                    </Link>
                                    <Link to="/profile"
                                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                          onClick={() => setIsOpen(false)}
                                    >
                                        I miei preferiti
                                    </Link>
                                    <button
                                        className="text-left w-full cursor-pointer block px-4 py-2 hover:bg-red-100 text-red-600 transition-colors"
                                        onClick={async () => {
                                            await signOut();
                                            setIsOpen(false);
                                        }}
                                    >
                                        Logout
                                    </button>
                                    </>
                            ) : (
                                <>
                                    <Link to="/register"
                                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                          onClick={() => setIsOpen(false)}
                                    >
                                        Registrati
                                    </Link >

                                    <Link to="/login"
                                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                                          onClick={() => setIsOpen(false)}
                                    >
                                        Accedi
                                    </Link >
                                </>
                                )}
                        </div>
                    </div>
                </nav>

                {/* Hamburger menu per mobile */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden bg-black/95 text-white transition-all duration-300 overflow-hidden ${
                    mobileMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="p-4 space-y-4 border-t border-gray-700">

                    <SearchBar />

                    {session ? (
                        <>
                            <Link
                                to="/account"
                                className="block hover:text-blue-400 transition"
                                onClick={() => setMobileMenu(false)}
                            >
                                Chi sono
                            </Link>
                            <Link
                                to="/profile"
                                className="block hover:text-blue-400 transition"
                                onClick={() => setMobileMenu(false)}
                            >
                                I miei preferiti
                            </Link>
                            <button
                                className="block w-full text-left text-red-400 hover:text-red-500 transition"
                                onClick={async () => {
                                    await signOut();
                                    setMobileMenu(false);
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/register"
                                className="block hover:text-blue-400 transition"
                                onClick={() => setMobileMenu(false)}
                            >
                                Registrazione
                            </Link>
                            <Link
                                to="/login"
                                className="block hover:text-blue-400 transition"
                                onClick={() => setMobileMenu(false)}
                            >
                                Accedi
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
