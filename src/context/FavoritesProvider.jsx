import { useState, useEffect, useContext, useCallback } from "react";
import supabase from "../supabase/supabase-client";
import FavoritesContext from "./FavoritesContext";
import SessionContext from "./SessionContext";
import {toast} from "sonner";
export default function FavoritesProvider({children}) {

    const [favorites, setFavorites] = useState([]);
    const {session} = useContext(SessionContext);
    const getFavorites = useCallback(async () => {

        let { data: favourites, error } = await supabase
            .from("favorites")
            .select("*")
            .eq("user_id", session?.user.id);
        if (error) {
            toast.error(error);
        } else {
            setFavorites(favourites);
        }
    }, [session]);

    const addFavorites = async (game) => {
        await supabase
            .from("favorites")
            .insert([
                {
                    user_id: session?.user.id,
                    game_id: game.id,
                    game_name: game.name,
                    game_image: game.background_image,
                },
            ])
            .select();
        toast.success(`${game.name} aggiunto ai preferiti`);
        getFavorites() // aggiunto questo
    };

    const removeFavorite = async (game_id, game_name) => {
        await supabase
            .from("favorites")
            .delete()
            .eq("game_id",game_id)
            .eq("user_id", session?.user.id);
        toast.success(`${game_name} rimosso dai preferiti`);

        getFavorites();
    };

    useEffect(() => {
        if (session) {
            getFavorites()
        }

        const favorites = supabase
            .channel("favorites")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "favorites" },
                () => getFavorites()
            )
            .subscribe();

        return () => {
            if (favorites) {
                supabase.removeChannel(favorites);
            }
            favorites.unsubscribe();
        };
    }, [getFavorites, session]);

    return (
        <FavoritesContext.Provider value={{favorites, setFavorites, addFavorites, removeFavorite}}>
            {children}
        </FavoritesContext.Provider>
    )
}