import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { AsideComponent } from './estructura/aside/aside.component';
import { ContentComponent } from './estructura/content/content.component';
import { FooterComponent } from './estructura/footer/footer.component';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { CategoriaComponent } from './modulos/categoria/categoria.component';
import { CiudadComponent } from './modulos/ciudad/ciudad.component';
import { ClienteComponent } from './modulos/cliente/cliente.component';
import { DepartamentoComponent } from './modulos/departamento/departamento.component';
import { DevolucionesComponent } from './modulos/devoluciones/devoluciones.component';
import { PagoComponent } from './modulos/pago/pago.component';
import { ProductosComponent } from './modulos/productos/productos.component';
import { ProveedorComponent } from './modulos/proveedor/proveedor.component';
import { ReabastecimientoComponent } from './modulos/reabastecimiento/reabastecimiento.component';
import { TipoUsuarioComponent } from './modulos/tipo-usuario/tipo-usuario.component';
import { UsuarioComponent } from './modulos/usuario/usuario.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    CiudadComponent,
    ClienteComponent,
    DepartamentoComponent,
    DevolucionesComponent,
    PagoComponent,
    ProductosComponent,
    ProveedorComponent,
    ReabastecimientoComponent,
    TipoUsuarioComponent,
    UsuarioComponent,
    VentasComponent,
    CategoriaComponent,
    LoginComponent,
    NoEncontroComponent,
    PedidosComponent,
    PedidoinsertarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
