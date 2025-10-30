import { useCallback, useState, useEffect, useRef } from "react";
import supabase from "../supabase/supabase-client";
import { italianDate } from "../utils/helpers.js";
import Loading from "./common/Loading.jsx";
import ErrorNotice from "./common/ErrorNotice.jsx";
export default function RealtimeChat({ data }){

    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);

    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop=messageRef.current.scrollHeight;
        }
    };

    const getInitialMessages = useCallback( async () => {
        try {
            setLoadingInitial(true);
            const { data: msgs, error } = await supabase
                .from("messages")
                .select("*")
                .eq("game_id", data?.id)
                .order("updated_at", { ascending: true });
            if (error) {
                setError(error.message);
                return
            }
            setMessages(msgs);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingInitial(false);
        }
    }, [data?.id]);

    useEffect(() => {
        if(data){
            getInitialMessages();
        }
        const channel = supabase
            .channel("messages")
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "messages",
             }, () => getInitialMessages())
            .subscribe();

        return () => {
            if (channel) {
                supabase.removeChannel(channel);
            }
            channel.unsubscribe();
         }
    },[getInitialMessages, data]);

    useEffect(() => {
        scrollSmoothToBottom()
    }, [messages]);

    return (
        <div className="flex flex-col">

            {/* Lista dei messaggi */}
            <div ref={messageRef} className="flex-1 overflow-y-auto mb-4 space-y-3">

                { loadingInitial && <Loading /> }

                { error && <ErrorNotice error={error} /> }

                {messages && messages.length > 0 && messages.map((msg) => (
                    <div key={msg.id} className="p-3 rounded-xl border border-gray-200 bg-gray-50">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-gray-700">{msg.profile_username}</span>
                            <span className="text-gray-400 text-xs">
                                {italianDate(msg.updated_at,true)}
                             </span>
                        </div>
                        <p className="text-gray-700">{msg.content}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}