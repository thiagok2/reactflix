import "./ProfilesPage.css";
import React from "react";

import SelecaoPerfil from "../Components/SelecaoPerfil";
import UsuariosService from "../Services/UsuariosService";

function ProfilePage() {
  const todos = UsuariosService.getAll();
  // embaralhar e limitar a 4
  const usuarioLimitador = [...todos].sort(() => Math.random() - 0.5).slice(0, 4);

  return (
    <div className="App">
      <SelecaoPerfil listaDeUsuarios={usuarioLimitador} />
    </div>
  );
}

export default ProfilePage;