import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { UsuarioComponent } from './usuario/usuario.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'usuario', component: UsuarioComponent},
    {path: '**', component: ErrorComponent},
];

export const appRoutingProviders: any [] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);