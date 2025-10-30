import { useContext } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "../context/SessionContext";
import RealtimeChat from "./RealtimeChat";
export default function Chatbox( { data } ) {
    const { session } = useContext(SessionContext);
    const handleSubmitMessage = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const { message } = Object.fromEntries(new FormData(form))

        if( typeof message === "string" && message.trim().length !== 0) {
            const { error } = await supabase
                .from('messages')
                .insert([
                    {
                        profile_id: session?.user.id,
                        profile_username: session?.user.user_metadata.username,
                        game_id: data.id,
                        content: message,
                    },
                 ]
                )
                .select();

            if (error) {
                console.log(error);
            }else{
                form.reset();
            }
        }
    }

    return(
        <div className="max-w-4xl mx-auto py-8">
             <div className="p-4 bg-white shadow-lg rounded-xl overflow-hidden">

                <h2 className="text-2xl font-semibold mb-4">Chat di gioco</h2>

                 <RealtimeChat data={data && data} />

                <form onSubmit={handleSubmitMessage}>
                  <textarea
                      className="w-full resize-none border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 text-gray-700"
                      rows={4}
                      name="message"
                      placeholder="Scrivi un messaggio..."

                  />
                        <button
                            className="cursor-pointer self-end px-5 py-2 rounded-xl mt-3
                            font-semibold text-white transition bg-black hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
                        >   Invia

                        </button>
                    </form>
            </div>
        </div>
    )
}