import { useState } from "react";
import { useNavigate } from "react-router";
import { FormSchemaLogin, ConfirmSchemaLogin, getErrors, getFieldError } from "../../lib/validationForm";
import supabase from "../../supabase/supabase-client";
import ErrorNotice from "../../components/common/ErrorNotice";
export default function LoginPage() {
    const navigate = useNavigate();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [touchedField, setTouchedField] = useState({});
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const [errorLogin, setErrorLogin] = useState("");

    // onBlur generico
    const onBlur = (property) => () => {
        const message = getFieldError(property, formState[property]);
        setTouchedField({ ...touchedField, [property]: true });
        setFormErrors({ ...formErrors, [property]: message });
    };

    // Gestione submit
    const onSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setErrorLogin("");

        const { error, data } = ConfirmSchemaLogin.safeParse(formState);

        if (error) {
            const errors = getErrors(error);
            setFormErrors(errors);
        } else {
            const { error: signInError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (signInError) {
                setErrorLogin(signInError.message);
            } else {
                console.log("Login effettuato 👍🏻!");
                navigate("/"); // redirect alla home
            }
        }
    };

    // Controllo errori
    const isInvalid = (property) => {
        return (formSubmitted || touchedField?.[property]) && !!formErrors?.[property];
    };

    // Gestione onChange generica
    const setField = (property, valueSelector) => (e) => {
        setFormState((prev) => ({
            ...prev,
            [property]: valueSelector ? valueSelector(e) : e.target.value,
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex py-6 items-start justify-center px-4">
            <form
                onSubmit={onSubmit}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform hover:scale-[1.01]"
            >
                <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
                    Accedi al tuo account
                </h2>

                {errorLogin && <ErrorNotice error={errorLogin} />}

                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">Email</label>
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

                    {/* Password */}
                    <div>
                        <label className="block text-gray-600 mb-1 font-medium">Password</label>
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
                    Accedi
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                    Non hai un account?{" "}
                    <a
                        href="/register"
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Registrati
                    </a>
                </p>
            </form>
        </div>
    );
}
