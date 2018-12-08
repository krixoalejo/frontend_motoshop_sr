import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VehiculoServicio } from '../servicios/vehiculos.service';
import { Vehiculo } from '../modelos/vehiculo';
import { HttpResponseApi } from '../modelos/httpResponseApi';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificacionesServicio } from '../servicios/notificaciones.service';

@Component({
    selector: 'vehiculo-lista',
    templateUrl: './vehiculo_lista.component.html',
    styleUrls: ['./vehiculo.component.css'],
    providers: [VehiculoServicio, NotificacionesServicio]
})

export class VehiculoListaComponent {
    public titulo: string;
    public listaVehiculos: Array<Vehiculo>;
    public idVehiculo: number;
    public pagina: number;
    public paginas: number;
    public formFiltros: FormGroup;
    public filtros;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehiculoServicio: VehiculoServicio,
        public _fb: FormBuilder,
        private _notificacionesServicio: NotificacionesServicio
    ) {
        this.titulo = 'Lista de vehículos';
        this.pagina = 1;
        this.paginas = 0;
        this.formFiltros = this._fb.group({
            desde: ['', []],
            hasta: ['', []],
            placa: ['', []],
            marca: ['', []],
            linea: ['', []],
            modelo: ['', []],
            cilindraje: ['', []],
            color: ['', []],
            propietario: ['', []],
            estado: ['', []],
        });
    }

    ngOnInit() {
        this.obtenerVehiculos();
    }

    public obtenerVehiculos() {
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: this.pagina - 1
        }
        this._vehiculoServicio.obtenerVehiculos(filtros).then((res: HttpResponseApi) => {
            if (res.estado) {
                this.sendNotification(res.estado, res.mensaje);
                this.listaVehiculos = res.data.vehiculos;
                this.paginas = res.data.cantidad;
            } else {
                this.sendNotification(res.estado, res.mensaje);
                this.listaVehiculos = null;
                this.paginas = 0;
            }
        })
    }

    public sendNotification(estado, mensaje) {
        if (estado) {
            this._notificacionesServicio.notificationSuccess(mensaje);
        } else {
            this._notificacionesServicio.notificationWarning(mensaje);
        }
    }

    public detalleVehiculo(idVehiculo) {
        this._router.navigate(['/vehiculo-crear/' + idVehiculo]);
    }

    public async eliminarVehiculo() {
        await this._vehiculoServicio.eliminarVehiculo(this.idVehiculo);
        this.listaVehiculos = [];
        this.obtenerVehiculos();
    }

    public asignarIdVehiculo(id) {
        this.idVehiculo = id;
    }

    public cambiarPagina(pagina: number) {
        const filtros = {
            filtros: this.formFiltros.value,
            pagina: pagina - 1
        }
        this._vehiculoServicio.obtenerVehiculos(filtros).then((res: HttpResponseApi) => {
            this.listaVehiculos = res.data.vehiculos;
            this.paginas = res.data.cantidad;
        })
    }

    public limpiarFiltros() {
        this.formFiltros.reset();
        this.obtenerVehiculos();
    }
}