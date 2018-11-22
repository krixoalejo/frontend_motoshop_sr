import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioServicio } from '../servicios/usuarios.service';
import { Usuario } from '../modelos/usuario';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Component({
    selector: 'usuario-lista',
    templateUrl: './usuario_lista.component.html',
    styleUrls: ['./usuario.component.css'],
    providers: [UsuarioServicio]
})

export class UsuarioListaComponent{
    public titulo:string;
    public labelBoton:string;
    public listaUsuarios: Array<Usuario>;
    public usuarioC:Usuario;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioServicio: UsuarioServicio
    ){
        this.titulo = 'Lista de usuarios';
    }

    ngOnInit(){        
        this._usuarioServicio.obtenerUsuarios().then((res:HttpResponseApi) =>{
            this.listaUsuarios = res.data;
        })
    }
}