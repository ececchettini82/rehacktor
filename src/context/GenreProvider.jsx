import { useState } from "react";
import GenreContext from "./GenreContext";
export default function GenreProvider({ children }) {
    const [genreName, setGenreName] = useState("");

    return (
        <GenreContext.Provider value={{genreName, setGenreName}}>
            {children}
        </GenreContext.Provider>
    )
}