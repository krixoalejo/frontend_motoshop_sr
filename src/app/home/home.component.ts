import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent{
    public titulo:string;
    public parametro:string;

    constructor(){
        this.titulo = 'Página principal.'
    }

    ngOnInit(){
        console.log('Se ha cargado el componente HomeComponent');
        
        // this._route.params.forEach((params: Params) => {
        //     this.parametro = params['page'];
        // });
    }

    redirigir(){
        // this._router.navigate(['/contacto', 'HolaAlejo']);
    }
}