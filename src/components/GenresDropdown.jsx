import { useContext} from "react";
import { Link } from 'react-router';
import ErrorNotice from "./common/ErrorNotice";
import useFetchSolution from "../hook/useFetchSolution";
import GenreContext from "../context/GenreContext";
export default function GenresDropdown() {
    const apiKey = "94724c7b02ba44eca98695bf889d61c4";
    const initialUrl = `https://api.rawg.io/api/genres?key=${apiKey}`;
    const { data: genres, error } = useFetchSolution(initialUrl);
    const { setGenreName } = useContext(GenreContext);

    return (
        <>
            { error && <ErrorNotice error={ error } /> }

            { genres?.results.length > 0 && (
                <details className="relative w-full mb-4">
                    <summary
                        className="cursor-pointer w-full bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2 flex justify-between items-center hover:bg-gray-50"
                    >
                        Seleziona un genere
                        <svg
                            className="w-5 h-5 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </summary>

                    <ul className="mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {genres.results.map((genre) => (
                            <li key={genre.id} className="px-4 py-2 hover:bg-blue-100 cursor-pointer select-none">
                                <Link
                                    onClick={() => setGenreName(genre.name)}
                                    className="block w-full" to={`/games/${genre.slug}`}>{ genre.name }</Link>
                            </li>
                        ))}
                    </ul>
                </details>
                )
            }
        </>
    )
}