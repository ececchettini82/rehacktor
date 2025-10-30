import { useContext } from "react";
import {Heart} from "lucide-react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
export default function ProfilePage() {
    const { session } = useContext(SessionContext);
    const { favorites, removeFavorite } = useContext(FavoritesContext);

    return (
        <div className="min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 px-6">I preferiti di {session?.user.user_metadata.first_name}</h1>

            {favorites && favorites.length === 0 && (
                <p className="px-6">Non ci sono giochi tra i preferiti.</p>
            )}

            {favorites && favorites.length > 0 && (

                <div className="p-6 max-w-3xl">

                    <ul className="space-y-4">
                        {favorites.map((game) => (
                            <li
                                key={game.game_id}
                                className="flex items-center justify-between bg-white shadow rounded-xl p-3"
                            >
                                {/* Thumbnail + Titolo */}
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={game.game_image}
                                        alt={game.game_name}
                                        className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <span className="font-medium">{game.game_name}</span>
                                </div>

                                {/* Azioni */}
                                <div className="flex items-center space-x-3">

                                    {/* Cuoricino per rimuovere dai preferiti */}
                                    <button
                                        type="button"
                                        onClick={() => removeFavorite(game.game_id)}
                                        aria-label="Rimuovi dai preferiti"
                                        className="cursor-pointer p-2 text-red-500 hover:scale-125 transition-transform"
                                    >
                                        <Heart className="w-5 h-5 fill-red-500" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}