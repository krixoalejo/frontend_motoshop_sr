import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GLOBAL} from './global';
import { HttpResponseApi } from '../modelos/httpResponseApi';

@Injectable()
export class UsuarioServicio{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.urlBackend;
    }

    public obtenerUsuarios(): Promise <HttpResponseApi>{
		return this._http.get<HttpResponseApi>( this.url + GLOBAL.rutas.usuarios ).toPromise();
    }
}