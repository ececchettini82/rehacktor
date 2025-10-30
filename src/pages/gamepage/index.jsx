import { useContext} from "react";
import { useParams } from "react-router";
import { italianDate } from "../../utils/helpers";
import useFetchSolution from "../../hook/useFetchSolution";
import ToggleFavorite from "../../components/ToggleFavorite";
import Chatbox from "../../components/Chatbox";
import ErrorNotice from "../../components/common/ErrorNotice";
import Loading from "../../components/common/Loading";
import SessionContext from "../../context/SessionContext";
export default function GamePage(){
    const { id } = useParams();
    const apiKey = "94724c7b02ba44eca98695bf889d61c4";
    const initialUrl=`https://api.rawg.io/api/games/${id}?key=${apiKey}`;
    const { loading, data, error } = useFetchSolution(initialUrl);
    const { session } = useContext(SessionContext);

    return(
        <div className="gamepage">
            { error && <ErrorNotice error={error} /> }

            { loading && <Loading /> }

            { data && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                        {/* Immagine sopra */}
                        <div className="w-full">
                            <img
                                src={data.background_image}
                                alt={data.name}
                                className="w-full h-64 md:h-80 object-cover"
                            />
                        </div>

                        {/* Contenuto del gioco */}
                        <div className="p-6 flex flex-col gap-4">
                            <h1 className="text-3xl font-bold text-gray-800">{data.name}</h1>
                            <ToggleFavorite data={data} />
                            <div className="text-gray-500">
                                <span>Data di uscita: {italianDate(data.released)}</span><br />
                                <span className="text-yellow-500 font-semibold">Rating: {data.rating} / 5</span>
                            </div>
                            <div
                                className="text-gray-700 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: data.description }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {session?.user?.id &&
              <Chatbox data={data} />
            }

        </div>
    )
}