import "./ProfilesPage.css";


import SelecaoPerfil from "../Components/SelecaoPerfil";
import { Usuarios } from "../Services/UsuarioMock";

function ProfilePage () {
  const usuarioLimitador = [...Usuarios].sort(() => Math.random() - 0.5).slice(0,4);
 return(
   <div className="App">
    
      <SelecaoPerfil listaDeUsuarios={usuarioLimitador} /> 
    </div>
 )
};

   

export default ProfilePage;