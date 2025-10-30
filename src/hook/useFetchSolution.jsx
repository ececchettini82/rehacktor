import { useState, useEffect, useCallback, useRef } from "react";
export default function useFetchSolution(initialUrl) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState(initialUrl);
    const [accumulatedResults, setAccumulatedResults] = useState([]);
    const isInitialMount = useRef(true);

    const load = useCallback(async (append = false) => {
        if (!url) {
            setError("URL mancante");
            setData(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const json = await response.json();
            setData(json);

            // Gestione accumulo risultati
            if (append && json.results) {
                setAccumulatedResults(prev => [...prev, ...json.results]);
            } else if (json.results) {
                setAccumulatedResults(json.results);
            }
        } catch (error) {
            setError(error.message);
            setData(null);
        }
        setLoading(false);
    }, [url]);

    useEffect(() => {
        // Carica solo al mount iniziale
        if (isInitialMount.current) {
            load();
            isInitialMount.current = false;
        }
    }, [load]);

    const reset = useCallback(() => {
        setAccumulatedResults([]);
        setData(null);
        setError(null);
        isInitialMount.current = true;
    }, []);

    return {
        data,
        error,
        loading,
        load,
        url,
        setUrl,
        accumulatedResults,
        reset
    };
}