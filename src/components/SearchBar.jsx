import { useState } from "react";
import { useNavigate } from "react-router";
export default function SearchBar () {
    const [inputValue, setInputValue] = useState("");
    const [ariaInvalid, setAriaInvalid] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (typeof inputValue === "string" && inputValue.trim().length > 0) {
            navigate(`/search?query=${inputValue}`);
            setInputValue(''); // svuoto il campo input dopo l'invio del form
        } else {
            setAriaInvalid(true);
        }
    };

    return (

        <form
            onSubmit={ handleSubmit }
            className="w-full flex items-center space-x-2 bg-white rounded-xl px-3 py-1 shadow-inner transition-all focus-within:ring-2 focus-within:ring-blue-400 w-1/3 justify-between"
        >
            <input
                type="text"
                name="search"
                placeholder={ ariaInvalid ? "Scrivi qualcosa per effettuare la ricerca" : "Cosa stai cercando?" }
                value={ inputValue }
                onChange={ (e) => setInputValue(e.target.value) }
                className="bg-transparent text-black px-2 py-1 outline-none flex-1"
                aria-invalid={ariaInvalid}
            />
            <button
                type="submit"
                className="bg-black cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
            >
                Cerca
            </button>
        </form>
    )
}