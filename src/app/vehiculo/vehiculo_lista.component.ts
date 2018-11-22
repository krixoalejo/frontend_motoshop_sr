import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VehiculoServicio } from '../servicios/vehiculos.service';
import { Vehiculo } from '../modelos/vehiculo';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Component({
    selector: 'vehiculo-lista',
    templateUrl: './vehiculo_lista.component.html',
    styleUrls: ['./vehiculo.component.css'],
    providers: [VehiculoServicio]
})

export class VehiculoListaComponent {
    public titulo: string;
    public listaVehiculos: Array<Vehiculo>;
    public idVheiculo: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _vehiculoServicio: VehiculoServicio,
    ) {
        this.titulo = 'Lista de vehículos';
    }

    ngOnInit() {
        this._vehiculoServicio.obtenerVehiculos().then((res: HttpResponseApi) => {
            this.listaVehiculos = res.data;
            console.log(this.listaVehiculos);
            
        })
    }

    public detalleVehiculo(idVheiculo) {
        this._router.navigate(['/vehiculo-crear/' + idVheiculo]);
    }

    public eliminarVehiculo(idVheiculo) {
        this._vehiculoServicio.eliminarVehiculo(idVheiculo);
    }

    public asignarIdVehiculo(id) {
        this.idVheiculo = id;
    }
}