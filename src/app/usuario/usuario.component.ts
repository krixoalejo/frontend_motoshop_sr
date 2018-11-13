import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioServicio } from '../servicios/usuarios.service';
import { Usuario } from '../modelos/usuario';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Component({
    selector: 'usuario',
    templateUrl: './usuario.component.html',
    styleUrls: ['./usuario.component.css'],
    providers: [UsuarioServicio]
})

export class UsuarioComponent{
    public titulo:string;
    public labelBoton:string;
    public listaUsuarios: Array<Usuario>;
    public usuarioC:Usuario;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioServicio: UsuarioServicio
    ){
        this.titulo = 'Usuarios';
        this.labelBoton = 'Guardar usuario';
        this.usuarioC = new Usuario(0,0,0,'','','','','','','','','','',0);
    }

    ngOnInit(){
        console.log('Componente usuario.component.ts cargado');
        this._usuarioServicio.obtenerUsuarios().then((res:HttpResponseApi) =>{
            this.listaUsuarios = res.data;
            console.log(this.listaUsuarios);            
        })
    }

    guardarUsuario(){
        console.log(this.usuarioC);        
    }
}