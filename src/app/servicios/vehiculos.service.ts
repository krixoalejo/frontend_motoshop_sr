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
        let vehi = await this._http.get<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos + '/' + idVehiculo).toPromise();
        return vehi;

    }

    public obtenerVehiculos(): Promise<HttpResponseApi> {
        return this._http.get<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos).toPromise();
    }

    public guardarVehiculo(vehiculo): Promise<HttpResponseApi> {
        return this._http.post<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos, vehiculo).toPromise();
    }

    public actualziarVehiculo(vehiculo): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos, vehiculo).toPromise();
    }

    public eliminarVehiculo(idVehiculo): Promise<HttpResponseApi> {
        return this._http.put<HttpResponseApi>(this.url + GLOBAL.rutas.vehiculos_eliminar, { idVehiculo: idVehiculo }).toPromise();
    }
}