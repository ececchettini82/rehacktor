import { Link } from 'react-router';
import LazyLoadGameImage from "./LazyLoadGameImage";
import { italianDate } from "../utils/helpers.js";
import ToggleFavorite from "./ToggleFavorite";
const CardGame = ( { game } ) => {

    const genres =game.genres?.map((genre) => genre.name).join(", ");
    const { background_image : image } = game;

    return (
        <div className="flex flex-col justify-stretch relative rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transform transition-all duration-300">
            {/* Immagine di sfondo */}
            <div className="relative md:h-48 h-80 overflow-hidden">
                <LazyLoadGameImage
                    image={ image }
                    altName={ game.name }
                    className="w-full h-full object-cover brightness-90 hover:brightness-100 transition-all duration-300"
                />
                {/* Overlay glassmorphism */}
                <div className="absolute inset-0 bg-white/20"></div>
            </div>

            {/* Contenuto della card */}
            <div className="p-5 bg-white/70 backdrop-blur-md -mt-16 shadow-inner flex flex-col grow justify-between">
                <h2 className="card-title text-2xl font-bold text-gray-900 leading-none mb-2">{game.name}</h2>

                <p className="text-sm text-gray-500 mb-1">{genres}</p>
                <p className="text-gray-700 text-xs mb-2  line-clamp-3">{ italianDate(game.released) }</p>
                <ToggleFavorite data={game} />

                <button
                    className="bg-black cursor-pointer mt-3 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
                >
                    <Link to={`/games/${game.slug}/${game.id}`}>Scopri il gioco</Link>
                </button>
            </div>
        </div>
    );
};
export default CardGame;