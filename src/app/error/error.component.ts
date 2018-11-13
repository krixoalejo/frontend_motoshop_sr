import { Component } from '@angular/core';

@Component({
    selector: 'error',
    templateUrl: './error.component.html'
})

export class ErrorComponent{
    public titulo:string;

    constructor(){
        this.titulo = 'Error 404';
    }

    ngOnInit(){
        console.log('Componente error.component.ts cargado');        
    }
}