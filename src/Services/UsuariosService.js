import {Usuario1 ,Usuario2, Usuario3,Usuario4 } from '../Services/UsuarioMock'

class UsuariosService{

    constructor(){
        this.todosUsuarios =[ ...Usuario1,...Usuario2,...Usuario3,...Usuario4]
    }
    getByID(id){
        return this.todosUsuarios.find(usuario = usuario.id === id ) || null;
    }
    getRandomUsuario(){
        const aleatorio = Math.floor(Math.random() * (this.todosUsuarios.length))
    return this.todosUsuarios[aleatorio];
    }

}
export default new UsuariosService;