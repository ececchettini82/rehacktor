import { useState } from "react";
import { ConfirmSchema, getErrors, getFieldError }  from "../../lib/validationForm";
import { useNavigate, Link } from "react-router";
import supabase from "../../supabase/supabase-client";

export default function RegisterPage(){

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedField, setTouchedField] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const onBlur = (property) => () =>{
        const message = getFieldError(property, formState[property]);
        setTouchedField({...touchedField, [property]: true});
        setFormErrors({...formErrors, [property]: message});
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        const {error, data} = ConfirmSchema.safeParse(formState);

        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors || {});
            return; // IMPORTANTE: esci qui per non continuare
        }

        try {
            let { error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        username: data.username
                    }
                }
            });

            if (signUpError) {
                alert("👎🏻 Errore nel login: "+ signUpError.message);
            } else {
                alert("Registrazione avvenuta 👍🏻!");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/");
            }
        } catch (err) {
            console.error('Errore durante la registrazione:', err);
            alert("Errore imprevisto durante la registrazione");
        }
    };

    const isInvalid = (property) => {
        if (formSubmitted || touchedField[property]) {
            return !!formErrors[property];
        }
        return undefined;
    }
    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({ ...prev, [property]: valueSelector ? valueSelector(e) : e.target.value }));
    }

    /*
        formState → contiene i valori dei campi.
        formErrors → contiene eventuali errori di validazione.
        touchedField → permette di mostrare errori solo dopo che l’utente ha interagito col campo.
        formSubmitted → permette di mostrare errori anche se l’utente non ha ancora toccato i campi.
        onBlur → aggiorna touchedField e formErrors.
        onSubmit → valida tutto il form e gestisce l’invio.
        isInvalid → utility per sapere se mostrare errori per un campo.
        setField → aggiorna i valori degli input in modo generico.
    */

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex py-6 items-start justify-center px-4">
            <form noValidate
                onSubmit={onSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform hover:scale-[1.01]"
            >
                <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    Crea un nuovo profilo
                </h1>

                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={setField("email")}
                            onBlur={onBlur("email")}
                            aria-invalid={isInvalid("email")}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="esempio@email.com"
                            required
                        />

                        {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                        )}
                    </div>

                    {/* Nome */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">
                            Nome
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formState.firstName}
                            onChange={setField("firstName")}
                            onBlur={onBlur("firstName")}
                            aria-invalid={isInvalid("firstName")}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="Mario"
                            required
                        />
                        {formErrors.firstName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                        )}
                    </div>

                    {/* Cognome */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">
                            Cognome
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formState.lastName}
                            onChange={setField("lastName")}
                            onBlur={onBlur("lastName")}
                            aria-invalid={isInvalid("lastName")}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="Rossi"
                            required
                        />
                        {formErrors.lastName && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formState.username}
                            onChange={setField("username")}
                            onBlur={onBlur("username")}
                            aria-invalid={isInvalid("username")}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="mario_rossi"
                            required
                        />
                        {formErrors.username && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formState.password}
                            onChange={setField("password")}
                            onBlur={onBlur("password")}
                            aria-invalid={isInvalid("password")}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            placeholder="********"
                            required
                        />
                        {formErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-6 w-full cursor-pointer bg-black text-white font-semibold py-2 rounded-xl hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 transition"
                >
                    Registrati
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Hai già un account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Accedi
                    </Link>
                </p>
            </form>
        </div>
    );
}