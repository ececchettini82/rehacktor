export default function Loading(){
    return(
        <div className="flex px-6 my-6">
            {/* Spinner circolare */}
            <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            <span className="ml-3 text-blue-700 font-medium">Caricamento...</span>
        </div>
    )
}
