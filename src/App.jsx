import Routing from "./routes/Routing"
import GenreProvider from "./context/GenreProvider";
import SessionProvider from "./context/SessionProvider";
import FavoritesProvider from "./context/FavoritesProvider";
function App() {

  return (
    <>
        <SessionProvider>
            <FavoritesProvider>
                <GenreProvider>
                     <Routing />
                </GenreProvider>
            </FavoritesProvider>
        </SessionProvider>
    </>
  )
}
export default App
