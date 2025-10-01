import {usuarios} from './UsuarioMock' 
class UsuariosService{

    constructor(){
        this.todosUsuarios =[ ...usuarios ];
    }
    getByID(id){
        return this.todosUsuarios.find(usuario => usuario.id === id ) || null;
    }
    getRandomUsuario(){
        const aleatorio = Math.floor(Math.random() * (this.todosUsuarios.length))
    return this.todosUsuarios[aleatorio];
    }

}
export default new UsuariosService;