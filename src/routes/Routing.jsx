import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "../layout/Layout";
import Homepage from "../pages/homepage";
import ErrorPage from "../pages/error";
import GenrePage from "../pages/genrepage";
import GamePage from "../pages/gamepage";
import SearchPage from "../pages/searchpage";
import RegisterPage from "../pages/registerpage";
import LoginPage from "../pages/loginpage";
import AccountPage from "../pages/accountpage";
import ProfilePage from "../pages/profilepage";
import ScrollToTop from "../components/common/ScrollToTop";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";
export default function Routing(){
    return(
        <BrowserRouter>

            <ScrollToTop />

            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/games/:genre" element={<GenrePage />} />
                    <Route path="/games/:slug/:id" element={<GamePage />} />
                    <Route path="/search" element={<SearchPage />} />

                    {/* Solo per utenti NON autenticati */}
                    <Route element={<PublicRoutes />}>
                      <Route path="/register" element={<RegisterPage />}/>
                      <Route path="/login" element={<LoginPage />}/>
                    </Route>

                    {/* Solo per utenti AUTENTICATI */}
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                </Route>
            </Routes>

        </BrowserRouter>
    )
}