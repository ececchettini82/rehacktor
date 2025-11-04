import { useState, useContext } from "react";
import { Heart } from "lucide-react";
import FavoritesContext from "../context/FavoritesContext";
import SessionContext from "../context/SessionContext";
export default function ToggleFavorite({ data }) {
    const { favorites, addFavorites, removeFavorite } = useContext(FavoritesContext);
    const {session} = useContext(SessionContext);
    const isFavorite = () => favorites.find((el) => +el.game_id === data?.id);

    if (!session?.user?.id) return null;
    /*
    const addFavorites = async(game) => {
        const {data, error } = await supabase
        .from('favorites')
        .insert([
            {
                user_id: session?.user.id,
                game_id: game.id,
                game_name: game.name,
                game_image: game.background_image
            },
        ]).select();

        if (error) {
            alert(error);
        }
        else {
            setFavorites((prevState) => [...prevState, game]);
        }
    }

    const removeFavorites = async(game) => {
        const {data, error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', session?.user.id)
        .eq('game_id', game.id);

        if (error) {
            alert(error);
        }
        else {
            setFavorites((prevState) => prevState.filter((el) => (el.id !== game.id && el.user_id !== session?.user.id)));
        }
    }

    */

    return (

        <button
            type="button"
            onClick={ () => {
                console.log(data);
                isFavorite() ? removeFavorite(data.id,data.name) : addFavorites(data);
                }
            }
            aria-label={ isFavorite()  ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti" }
            className={`w-6 h-6 
        relative flex cursor-pointer
        rounded-full transition-transform duration-300 hover:scale-125
        focus:outline-none
        ${isFavorite()  ? "text-red-500" : "text-gray-400 hover:text-red-400"}
      `}
        >
            <Heart
                className={`w-6 h-6 transition-transform duration-300 ${
                    isFavorite() ? "fill-red-500 scale-110" : "fill-transparent"
                }`}
            />
        </button>
    );
}