import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useFetchSolution from "../../hook/useFetchSolution";
import CardGame from "../../components/CardGame";
import ErrorNotice from "../../components/common/ErrorNotice";
import Loading from "../../components/common/Loading";

export default function SearchPage() {
    let [searchParams] = useSearchParams();
    const game = searchParams.get("query");
    const apiKey = "94724c7b02ba44eca98695bf889d61c4";
    const [page, setPage] = useState(1);

    const baseUrl = (game != null)
        ? `https://api.rawg.io/api/games?key=${apiKey}&search=${game}`
        : `https://api.rawg.io/api/games?key=${apiKey}&dates=2024-01-01,2024-12-31`;

    const initialUrl = `${baseUrl}&page=1`;

    const { data, loading, error, setUrl, accumulatedResults, load, reset } = useFetchSolution(initialUrl);

    // Reset quando cambia la query di ricerca
    useEffect(() => {
        reset();
        setPage(1);
        setUrl(`${baseUrl}&page=1`);
    }, [game, baseUrl, setUrl, reset]);

    // Carica pagine successive
    useEffect(() => {
        if (page > 1) {
            load(true);
        }
    }, [page, load]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        setUrl(`${baseUrl}&page=${nextPage}`);
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {(game != null) ? "Risultati per: " + game : "Libreria Giochi"}
            </h1>

            {error && <ErrorNotice error={error} />}

            {loading && page === 1 && <Loading />}

            {accumulatedResults.length === 0 && !loading && (
                <p className="mb-6 text-gray-800">Nessun gioco trovato.</p>
            )}

            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {accumulatedResults.map((game) => (
                    <CardGame
                        key={game.id}
                        game={game}
                    />
                ))}
            </div>

            {accumulatedResults.length > 0 && data?.next && (
                <div className="flex justify-center mt-6">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="cursor-pointer px-6 py-2 bg-black text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Caricamento...' : 'Carica Altri'}
                    </button>
                </div>
            )}
        </>
    );
}