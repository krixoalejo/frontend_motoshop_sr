import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';
import { NgxNotificationComponent } from 'ngx-notification';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { ErrorComponent } from './error/error.component';
import { UsuarioListaComponent } from './usuario/usuario_lista.component';
import { UsuarioCrearComponent } from './usuario/usuario_crear.component';
import { VehiculoCrearComponent } from './vehiculo/vehiculo_crear.component';
import { VehiculoListaComponent } from './vehiculo/vehiculo_lista.component';

@NgModule({
  declarations: [
    AppComponent,
    NgxNotificationComponent,
    ErrorComponent,
    UsuarioCrearComponent,
    UsuarioListaComponent,
    VehiculoCrearComponent,
    VehiculoListaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
