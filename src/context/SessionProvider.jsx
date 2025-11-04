import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
import { toast } from "sonner";
export default function SessionProvider({children}) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (_event === 'SIGNED_OUT') {
                setSession(null);
            } else if (session) {
                setSession(session);
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        const {error } = await supabase.auth.signOut();
        if (error) {
            console.log(error);
            toast.error("Errore durante il logout");
        }else {
            toast.success("Logout avvenuto!");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500); // piccolo delay per mostrare la notifica
        }

    };

    return (
        <SessionContext.Provider value={{session, setSession, signOut }}>
            {children}
        </SessionContext.Provider>

    );
}