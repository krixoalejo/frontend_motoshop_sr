import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioServicio } from '../servicios/usuarios.service';
import { Usuario } from '../modelos/usuario';
import { NotificacionesServicio } from '../servicios/notificaciones.service';

@Component({
    selector: 'usuario-crear',
    templateUrl: './usuario_crear.component.html',
    styleUrls: ['./usuario.component.css'],
    providers: [UsuarioServicio, NotificacionesServicio]
})

export class UsuarioCrearComponent {
    public titulo: string;
    public usuario: Usuario;

    constructor(
        private _notificacionesServicio: NotificacionesServicio,
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioServicio: UsuarioServicio
    ) {
        this.titulo = 'Crear usuario';
        this.usuario = new Usuario(0,0,0,'','','','','','','','','','',0);
    }

    guardarUsuario(){
        this.sendNotification();
    }

    sendNotification() {
        this._notificacionesServicio.notificationSuccess('This is my message to you!');
    }
}