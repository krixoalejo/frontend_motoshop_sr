import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { VehiculoCrearComponent } from './vehiculo/vehiculo_crear.component';
import { VehiculoListaComponent } from './vehiculo/vehiculo_lista.component';
import { UsuarioCrearComponent } from './usuario/usuario_crear.component';
import { UsuarioListaComponent } from './usuario/usuario_lista.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
    { path: '', component: VehiculoListaComponent },
    { path: 'vehiculo-crear', component: VehiculoCrearComponent },
    { path: 'vehiculo-crear/:id', component: VehiculoCrearComponent },
    { path: 'vehiculo-lista', component: VehiculoListaComponent },
    { path: 'usuario-crear', component: UsuarioCrearComponent },
    { path: 'usuario-crear/:id', component: UsuarioCrearComponent },
    { path: 'usuario-lista', component: UsuarioListaComponent },
    { path: '**', component: ErrorComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);