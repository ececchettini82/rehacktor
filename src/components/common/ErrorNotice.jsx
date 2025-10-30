export default function ErrorNotice({ error }) {
    return (
        <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 px-6 rounded-lg mb-4"
             role="alert">
            {/* Icona di errore */}
            <svg
                className="w-5 h-5 mr-2 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path
                    d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm1 15H9v-2h2v2zm0-4H9V5h2v6z"/>
            </svg>
            <span>Errore: { error }</span>
        </div>
    )
}

