import { useState, useEffect, useContext  } from "react";
import supabase from "../../supabase/supabase-client";
import SessionContext from "../../context/SessionContext";
import Avatar from "../../components/Avatar";
import Loading from "../../components/common/Loading.jsx";
export default function AccountPage(){
    const { session } = useContext(SessionContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() =>
    {
        let ignore = false;
        const getProfile = async () => {
            try {

                //  Se session è null, non proseguire
                if (!session?.user) {
                    setLoading(false);
                    return;
                }

                setLoading(true);
                const { user } =  session;
                setEmail(user.email || null);

                const {data, error} = await supabase
                    .from('profiles')
                    .select(`username, first_name, last_name, avatar_url`)
                    .eq('id', user.id)
                    .single();

                if (!ignore) {
                    if (error) {
                        console.warn(error);
                    } else if (data) {
                        setUsername(data.username);
                        setFirstName(data.first_name);
                        setLastName(data.last_name);
                        setAvatarUrl(data.avatar_url)
                    }
                }

            } catch (error) {
                alert(error.message);
            } finally {
                if (!ignore) setLoading(false);
            }
        }
        getProfile();

        return () => {
            ignore = true;
        }
    }
        ,[session]
    );

    const updateProfile = async (event, avatarUrl) => {
        event.preventDefault()

        if (!session?.user) {
            alert("Nessuna sessione attiva. Effettua nuovamente il login.");
            return;
        }

        try {
            setLoading(true);

            const { user } =  session;

            const updates = {
                id: user.id,
                username,
                first_name,
                last_name,
                avatar_url: avatarUrl,
                updated_at: new Date(),
            };

            const {error} = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            } else{
                setAvatarUrl(avatarUrl);
                setSuccessMessage("Profilo aggiornato con successo!");
                setTimeout(() => setSuccessMessage(""), 4000); // scompare dopo 4 secondi
            }
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 flex py-6 items-start justify-center px-4">
            <form
                onSubmit={updateProfile}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl transition-transform hover:scale-[1.01]"
            >
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    Il mio profilo
                </h2>

                { loading && <Loading /> }

                {/* ✅ Messaggio di successo */}
                {successMessage && (
                    <div className="mb-4 rounded-xl bg-green-100 border border-green-300 text-green-700 px-4 py-2 text-sm text-center font-medium animate-fade-in">
                        {successMessage}
                    </div>
                )}
                <div className="my-6">
                    <label className="block text-gray-600 mb-1 font-medium">Immagine del profilo</label>
                    <Avatar
                        url={avatarUrl}
                        size={150}
                        onUpload={(event,url) => updateProfile(event,url)}
                    />
                </div>
                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            disabled
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username || ""}
                            onChange={(e)=>setUsername(e.target.value)}
                            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">Nome</label>
                        <input
                            type="text"
                            name="first_name"
                            value={first_name || ""}
                            onChange={(e)=>setFirstName(e.target.value)}
                            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">Cognome</label>
                        <input
                            type="text"
                            name="last_name"
                            value={last_name || ""}
                            onChange={(e)=>setLastName(e.target.value)}
                            className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-blue-400"
                            required
                            />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className={`cursor-pointer mt-6 w-full font-semibold py-2 rounded-xl text-white transition ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                    }`}
                >
                    {loading ? "Aggiornamento in corso..." : "Aggiorna"}
                </button>
            </form>
        </div>
    );
}