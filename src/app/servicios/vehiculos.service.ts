import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GLOBAL } from './global';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Injectable()
export class VehiculoServicio {
    public url: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = GLOBAL.urlBackend;
    }

    public async obtenerVehiculoPorId(idVehiculo) {
        return await this._http.get<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos + '/' + idVehiculo).toPromise();
    }

    public obtenerVehiculos(filtros): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos_obtenerlos, filtros).toPromise();
    }

    public guardarVehiculo(vehiculo): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos, vehiculo).toPromise();
    }

    public actualziarVehiculo(vehiculo): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos, vehiculo).toPromise();
    }

    public eliminarVehiculo(idVehi): Promise<HttpResponseApi> {     
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos_eliminar, { idVehiculo: idVehi }).toPromise();
    }
}