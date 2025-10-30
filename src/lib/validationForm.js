import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
const passwordError = "La password deve contenere almeno una lettera maiusciola, una minuscola, un numero e almeno 8 caratteri";
export const FormSchema = z.object({
    email: z.string().email("Inserisci un'email valida"),
    firstName: z.string().min(1,'Il nome è obbligatorio'),
    lastName: z.string().min(1,'Il cognome è obbligatorio'),
    username: z.string().min(3,"Inserisci almeno tre caratteri"),
    password: z.string().regex(passwordRegex, passwordError),

});
export const ConfirmSchema = FormSchema.refine((data) => data );
export const FormSchemaLogin = z.object({
    email: z.string().email("Inserisci un'email valida"),
    password: z.string().regex(passwordRegex, passwordError),
});

export const ConfirmSchemaLogin = FormSchemaLogin.refine((data) => data );

export function getFieldError(property, value){
    const {error} = FormSchema.shape[property].safeParse(value); //restituisce { success, data, error }

    //Se c’è un errore, restituisce il messaggio (o i messaggi concatenati)
    //Se tutto va bene → undefined (nessun errore)
    return error ? error.issues.map( (issue) => issue.message).join(", ") : undefined;
}

//Converte l’errore di Zod in un oggetto leggibile
export const getErrors = (error) =>
    error.issues.reduce((all, issue) => {
        const path = issue.path.join("");
        const message = all[path] ? all[path] + ", " : "";
        all[path] = message + issue.message;
        return all;
    }, {});
