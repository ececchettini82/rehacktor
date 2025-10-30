import { useState, useEffect } from "react";
import supabase from "../supabase/supabase-client";
import SessionContext from "./SessionContext";
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
        if (error) console.log(error);
        alert("Logout avvenuto 👍🏻!");
        window.location.href = "/";
    };

    return (
        <SessionContext.Provider value={{session, setSession, signOut }}>
            {children}
        </SessionContext.Provider>

    );
}