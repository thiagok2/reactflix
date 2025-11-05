import { Routes, Route } from "react-router-dom";
import ProfilesPage from "./pages/ProfilesPage";
import PerfilPage from './pages/PerfilPage';
import FilmePage from "./pages/FilmePage"; 
import CatalogoPage from "./pages/CatalogoPage"; 
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Colaboradores from "./pages/Colaboradores"
import Sobre from "./pages/Sobre"
import Comunidade from "./pages/Comunidade";

function MainRoutes() {
    return (
        <Routes> 
            <Route path="/" element={<ProfilesPage />} />
            <Route path="/perfil" element={<PerfilPage />} />
            
            <Route path="/home" element={<HomePage />} />
            <Route path="/filme" element={<FilmePage />} />
            <Route path="/filme/:id" element={<FilmePage />} /> 
            <Route path="/filme/:id" element={<PerfilPage />} /> 

            
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/catalogo/:tipo" element={<CatalogoPage />} />
            
            <Route path="/login" element={<LoginPage />} />
            <Route path="/colaboradores" element={<Colaboradores />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/comunidade" element={<Comunidade/>} />
            


        </Routes>
    );
}

export default MainRoutes;
