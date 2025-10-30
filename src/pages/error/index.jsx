import { Link } from "react-router";
import { ArrowLeftCircle } from "lucide-react";
export default function ErrorPage() {
    return (
        <div className="flex flex-col items-center bg-gray-50 text-center px-6">
            <h1 className="text-[120px] font-extrabold text-gray-800 leading-none mb-2">
                404
            </h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">
                Pagina non trovata
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
                Ops... sembra che la pagina che stavi cercando non esista o sia stata
                spostata altrove.
            </p>

            <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white font-semibold hover:bg-blue-700 transition-transform duration-300 hover:scale-105"
            >
                <ArrowLeftCircle className="w-5 h-5" />
                Torna alla Home
            </Link>

        </div>
    );
}
