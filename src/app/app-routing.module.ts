import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { CategoriaComponent } from './modulos/categoria/categoria.component';
import { TipoUsuarioComponent } from './modulos/tipo-usuario/tipo-usuario.component';
import { CiudadComponent } from './modulos/ciudad/ciudad.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { DepartamentoComponent } from './modulos/departamento/departamento.component';
import { DevolucionesComponent } from './modulos/devoluciones/devoluciones.component';
import { PagoComponent } from './modulos/pago/pago.component';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { ProveedorComponent } from './modulos/proveedor/proveedor.component';
import { ReabastecimientoComponent } from './modulos/reabastecimiento/reabastecimiento.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { validaruserGuard } from './guard/validaruser.guard';



const routes: Routes = [
  {
    path: '', component:PrincipalComponent,
    children:
    [
      {path: 'dashboard', component: DashboardComponent, canActivate:[validaruserGuard]},
      {path: 'categoria', component: CategoriaComponent, canActivate:[validaruserGuard]},
      {path: 'ciudad', component: CiudadComponent, canActivate:[validaruserGuard]},
      {path: 'cliente', component: ClienteComponent, canActivate:[validaruserGuard]},
      {path: 'departamento', component: DepartamentoComponent, canActivate:[validaruserGuard]},
      {path: 'devoluciones', component: DevolucionesComponent, canActivate:[validaruserGuard]},
      {path: 'pago', component: PagoComponent, canActivate:[validaruserGuard]},
      {path: 'pedidos', component: PedidosComponent, canActivate:[validaruserGuard]},
      {path: 'pedidoinsertar', component: PedidoinsertarComponent, canActivate:[validaruserGuard]},
      {path: 'productos', component: ProductosComponent, canActivate:[validaruserGuard]},
      {path: 'proveedor', component: ProveedorComponent, canActivate:[validaruserGuard]},
      {path: 'reabastecimiento', component: ReabastecimientoComponent, canActivate:[validaruserGuard]},
      {path: 'tipo_usuario', component: TipoUsuarioComponent, canActivate:[validaruserGuard]},
      {path: 'usuario', component: UsuarioComponent, canActivate:[validaruserGuard]},
      {path: 'ventas', component: VentasComponent, canActivate:[validaruserGuard]},
      {path: '', redirectTo: 'dashboard', pathMatch:'full'}
    ]
  },

  {path: 'login', component: LoginComponent},
  {path: '**', component:NoEncontroComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
