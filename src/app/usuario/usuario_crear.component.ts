import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuarioServicio } from '../servicios/usuarios.service';
import { Usuario } from '../modelos/usuario';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { GLOBAL } from '../servicios/global';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'usuario-crear',
    templateUrl: './usuario_crear.component.html',
    styleUrls: ['./usuario.component.css'],
    providers: [UsuarioServicio, NotificacionesServicio]
})

export class UsuarioCrearComponent {
    public titulo: string;
    public idUsuario;
    public usuario: Usuario;
    public formUsuario: FormGroup;
    public opcionesTipoDocumento: Array<string>;
    public tituloBtnLimpiarCampos: string;

    constructor(
        private _notificacionesServicio: NotificacionesServicio,
        private _route: ActivatedRoute,
        private _router: Router,
        private _usuarioServicio: UsuarioServicio,
        public _fb: FormBuilder
    ) {
        this.usuario = new Usuario(0, 0, 0, '', '', '', '', '', '', '', '', '', '', 0);
        this.opcionesTipoDocumento = ['C.C'];
        this.tituloBtnLimpiarCampos = 'Limpiar campos';
        this.formUsuario = this._fb.group({
            createdAt: ['', []],
            updatedAt: ['', []],
            id: ['', []],
            tipoIdentificacion: ['', [Validators.required]],
            identificacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
            primerNombre: ['', [Validators.required, Validators.minLength(2)]],
            segundoNombre: ['', []],
            primerApellido: ['', [Validators.required, Validators.minLength(2)]],
            segundoApellido: ['', []],
            telefono: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
            celular: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]],
            correoElectronico: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
            direccion: ['', [Validators.required, Validators.minLength(5)]],
            estado: ['', []],
        });
    }

    onChanges() {
        this.formUsuario.get('tipoIdentificacion').valueChanges
            .subscribe(tipoIdSeleccionado => {
                tipoIdSeleccionado === '' ? this.formUsuario.invalid : this.formUsuario.valid;
            });
    }

    ngOnInit() {
        this._route.params.forEach((params: Params) => {
            this.idUsuario = params['id'];
            if (this.idUsuario) {
                this.titulo = GLOBAL.titulosVistas.editarUsuarios;
                this.obtenerUsuarioPorId();
            } else {
                this.titulo = GLOBAL.titulosVistas.crearUsuarios;
            }
        })
    }

    public async guardarUsuario() {
        let respuesta;
        this.usuario = this.formUsuario.value;
        if (this.idUsuario) {
            respuesta = await this._usuarioServicio.actualziarUsuario(this.usuario);
        } else {
            respuesta = await this._usuarioServicio.guardarUsuario(this.usuario);
        }
        if (respuesta.estado) {
            this.sendNotification(respuesta.estado, respuesta.mensaje);
            this.irListaUsuarios();
        } else {
            this.sendNotification(respuesta.estado, respuesta.mensaje);
        }
    }

    public sendNotification(estado, mensaje) {
        if (estado) {
            this._notificacionesServicio.notificationSuccess(mensaje);
        } else {
            this._notificacionesServicio.notificationWarning(mensaje);
        }
    }

    public irListaUsuarios() {
        this._router.navigate(['/usuario-lista']);
    }

    public async obtenerUsuarioPorId() {
        if (this.idUsuario) {
            let respuesta = await this._usuarioServicio.obtenerUsuarioPorId(this.idUsuario);
            if (respuesta.estado) {
                this.formUsuario.setValue(respuesta.data[0]);
            } else {
                this.sendNotification(respuesta.estado, respuesta.mensaje);
            }
        }
    }

    public limpiarCampos(){
        this.formUsuario.reset();
        this._router.navigate(['/usuario-crear']);
    }
}