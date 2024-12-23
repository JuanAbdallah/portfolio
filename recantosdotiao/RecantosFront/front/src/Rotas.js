import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import BlocoView from "./views/Bloco/BlocoView";
import CasaView from "./views/Casa/CasaView";
import ResidenteView from "./views/Residente/ResidenteView";
import UsuarioView from "./views/Usuario/UsuarioView";
import AvisoView from "./views/Aviso/AvisoView";

const Rotas = () => {
    const { user } = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<LoginView />} />

            <Route
                path="/home"
                element={user ? <HomeView /> : <Navigate to="/" />}
            />

            {user && user.role === "Sindico" ? (
                <>
                    <Route path="/blocos" element={<BlocoView />} />
                    <Route path="/casas" element={<CasaView />} />
                    <Route path="/residentes" element={<ResidenteView />} />
                    <Route path="/usuarios" element={<UsuarioView />} />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/home" />} />
            )}

            {user && (user.role === "Sindico" || user.role === "Residente") ? (
                <Route path="/avisos" element={<AvisoView />} />
            ) : (
                <Route path="*" element={<Navigate to="/home" />} />
            )}
        </Routes>
    );
};

export default Rotas;
