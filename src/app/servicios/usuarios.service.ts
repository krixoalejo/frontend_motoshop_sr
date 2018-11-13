import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';
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
		return this._http.get<HttpResponseApi>(this.url+'usuarios').toPromise();
    }

    // public obtenerUsuarios():HttpResponseApi{
    //     return this._http.get(this.url + 'usuarios').pipe(map((res: Response) => res.json()));        
    // }
}