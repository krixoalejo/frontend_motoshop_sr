import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VehiculoServicio } from '../servicios/vehiculos.service';
import { Vehiculo } from '../modelos/vehiculo';
import { NotificacionesServicio } from '../servicios/notificaciones.service';
import { GLOBAL} from '../servicios/global';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'vehiculo-crear',
    templateUrl: './vehiculo_crear.component.html',
    styleUrls: ['./vehiculo.component.css'],
    providers: [VehiculoServicio, NotificacionesServicio]
})

export class VehiculoCrearComponent {
    public titulo: string;
    public idVehiculo;
    public vehiculo: Vehiculo;
    public formVehiculo: FormGroup;

    constructor(
        private _notificacionesServicio: NotificacionesServicio,
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehiculoServicio: VehiculoServicio,
        public _fb: FormBuilder
    ) {
        this.vehiculo = new Vehiculo(0,0,0,'','','','','','',0,0,0);
        this.formVehiculo = this._fb.group({
            createdAt: ['', []],
            updatedAt: ['', []],
            id: ['', []],
            usuario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
            placa: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6)]],
            marca: ['', [Validators.required]],
            linea: ['', [Validators.required]],
            modelo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(4)]],
            cilindraje: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
            color: ['', [Validators.required]],
            seguro: ['', []],
            estado: ['', []],
          });
    }

    ngOnInit (  ) {
        this._route.params.forEach( ( params: Params ) => {
            this.idVehiculo = params['id'];
            if ( this.idVehiculo ) {
                this.titulo = GLOBAL.titulosVistas.editarVehiculos;
                this.obtenerVehiculoPorId();
            } else {
                this.titulo = GLOBAL.titulosVistas.crearVehiculos;
            }           
        } )
    }

    public async guardarVehiculo (  ) {
        let respuesta;
        this.vehiculo = this.formVehiculo.value;
        if ( this.vehiculo.usuario > 0 ) {
            if ( this.idVehiculo ) {
                respuesta = await this._vehiculoServicio.actualziarVehiculo( this.vehiculo );
            } else {
                respuesta = await this._vehiculoServicio.guardarVehiculo( this.vehiculo );
            }
            if ( respuesta.estado ) {
                this.sendNotification( respuesta.estado, respuesta.mensaje );
                this.irListaVehiculos();                
            } else {
                this.sendNotification( respuesta.estado, respuesta.mensaje );
            }
        } else {
            this.sendNotification( false, GLOBAL.mensajes.identificacionUsuario );
        }
    }

    public sendNotification ( estado, mensaje ) {
        if ( estado ) {
            this._notificacionesServicio.notificationSuccess( mensaje );            
        } else {
            this._notificacionesServicio.notificationWarning( mensaje );
        }
    }

    public irListaVehiculos (  ) {
        this._router.navigate(['/vehiculo-lista']);
    }

    public async obtenerVehiculoPorId (  ) {
        if ( this.idVehiculo ) {
            let respuesta = await this._vehiculoServicio.obtenerVehiculoPorId( this.idVehiculo );   
            if ( respuesta.estado ) {
                this.formVehiculo.setValue(respuesta.data[0]);
            } else {
                this.sendNotification( respuesta.estado, respuesta.mensaje );
            }        
        }
    }
}