import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import { AuthProvider } from "./context/auth";
import CasaView from "./views/Casa/CasaView";
import BlocoView from "./views/Bloco/BlocoView";
import AvisoView from "./views/Aviso/AvisoView";
import ResidenteView from "./views/Residente/ResidenteView";
import UsuarioView from "./views/Usuario/UsuarioView";
import Rotas from "./Rotas";

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/home" element={<HomeView />} />
          <Route path="/blocos" element={<BlocoView />} />
          <Route path="/casas" element={<CasaView />} />
          <Route path="/residentes" element={<ResidenteView />} />
          <Route path="/usuarios" element={<UsuarioView />} />

          <Route path="/avisos" element={<AvisoView />} />
        </Routes> */}
        <Rotas></Rotas>
      </AuthProvider>
    </Router>
  );
}

export default App;
