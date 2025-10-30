import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import ErrorNotice from "../../components/common/ErrorNotice.jsx";
import Loading from "../../components/common/Loading.jsx";
import CardGame from "../../components/CardGame.jsx";
import useFetchSolution from "../../hook/useFetchSolution.jsx";
import GenreContext from "../../context/GenreContext";

export default function GenrePage() {
    const { genre } = useParams();
    const apiKey = "94724c7b02ba44eca98695bf889d61c4";
    const [page, setPage] = useState(1);

    const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}`;
    const initialUrl = `${baseUrl}&page=1`;

    const { data, error, loading, setUrl, accumulatedResults, load, reset } = useFetchSolution(initialUrl);
    const { genreName } = useContext(GenreContext);

    // Reset quando cambia il genere
    useEffect(() => {
        reset();
        setPage(1);
        setUrl(`${baseUrl}&page=1`);
    }, [genre, baseUrl, setUrl, reset]);

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
            <h1 className="text-3xl font-bold mb-6 text-gray-800">{genreName}</h1>

            {error && <ErrorNotice error={error} />}

            {loading && page === 1 && <Loading />}

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