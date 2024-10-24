import { Component } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import { ReabastecimientoService } from 'src/app/servicios/reabastecimiento.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reabastecimiento',
  templateUrl: './reabastecimiento.component.html',
  styleUrls: ['./reabastecimiento.component.scss']
})
export class ReabastecimientoComponent {

  reabastecimiento: any;
  productos: any;
  usuario: any;
  proveedor: any;
  id_reabastecimiento: any;

  obj_reabastecimiento= {
    fecha: "",
    orden_compra: "",
    cantidad_comprada: 0,
    precio_total: 0,
    fo_producto : 0,
    fo_usuario : 0,
    fo_proveedor : 0,
  }

  validar_fecha= true;
  validar_orden_compra= true;
  validar_cantidad_comprada= true;
  validar_precio_total= true;
  validar_producto= true;
  validar_usuario= true;
  validar_proveedor= true;
  mform= false;
  botones_form= false;

  constructor(private $reabastecimiento:ReabastecimientoService, private $productos:ProductosService, private $usuario:UsuarioService, private $proveedor:ProveedorService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_productos();
    this.consulta_usuario();
    this.consulta_proveedor();
  }

  consulta(){
    this.$reabastecimiento.consultar().subscribe((resultado:any) => {
    this.reabastecimiento = resultado;
    })
  }

  consulta_productos(){
    this.$productos.consultar().subscribe((resultado:any) => {
    this.productos = resultado;
    })
  }

  consulta_usuario(){
    this.$usuario.consultar().subscribe((resultado:any) => {
    this.usuario = resultado;
    })
  }

  consulta_proveedor(){
    this.$proveedor.consultar().subscribe((resultado:any) => {
    this.proveedor = resultado;
    })
  }
  
  mostrar_form(dato: any){
    switch(dato){
      case "ver":
      this.mform = true;
      break;
      case "no ver":
      this.mform = false;
      this.botones_form= false;
      break;
    }
  }

  limpiar(){
    this.obj_reabastecimiento= {
      fecha: "",
      orden_compra: "",
      cantidad_comprada: 0,
      precio_total: 0,
      fo_producto : 0,
      fo_usuario : 0,
      fo_proveedor : 0,
    }
  }

  validar(funcion:any){
    if (this.obj_reabastecimiento.fecha== ""){
      this.validar_fecha= false;
    }else{
      this.validar_fecha= true;
    }

    if (this.obj_reabastecimiento.orden_compra== ""){
      this.validar_orden_compra= false;
    }else{
      this.validar_orden_compra= true;
    }

    if (this.obj_reabastecimiento.cantidad_comprada== 0){
      this.validar_cantidad_comprada= false;
    }else{
      this.validar_cantidad_comprada= true;
    }

    if (this.obj_reabastecimiento.precio_total== 0){
      this.validar_precio_total= false;
    }else{
      this.validar_precio_total= true;
    }

    if (this.obj_reabastecimiento.fo_producto== 0){
      this.validar_producto= false;
    }else{
      this.validar_producto= true;
    }

    if (this.obj_reabastecimiento.fo_usuario== 0){
      this.validar_usuario= false;
    }else{
      this.validar_usuario= true;
    }

    if (this.obj_reabastecimiento.fo_proveedor== 0){
      this.validar_proveedor= false;
    }else{
      this.validar_proveedor= true;
    }

    if (this.validar_fecha== true && this.validar_orden_compra== true && this.validar_cantidad_comprada== true && this.validar_precio_total== true && this.validar_producto== true && this.validar_usuario== true && this.validar_proveedor== true && funcion== 'guardar'){
      this.guardar();
    }

    if (this.validar_fecha== true && this.validar_orden_compra== true && this.validar_cantidad_comprada== true && this.validar_precio_total== true && this.validar_producto== true && this.validar_usuario== true && this.validar_proveedor== true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.$reabastecimiento.insertar(this.obj_reabastecimiento).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
    }

  eliminar(id:number){
  
    Swal.fire({
      title: "Esta seguro de eliminar el reabastecimiento ?",
      text: "No podra revertir el proceso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
//Funcion
        this.$reabastecimiento.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Reabastecimiento Eliminado!",
          text: "El reabastecimiento ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_reabastecimiento= {
      fecha: items.fecha,
      orden_compra: items.orden_compra,
      cantidad_comprada: items.cantidad_comprada,
      precio_total: items.precio_total,
      fo_producto : items.fo_producto,
      fo_usuario : items.fo_usuario,
      fo_proveedor : items.fo_proveedor,
    }
  
    this.id_reabastecimiento = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$reabastecimiento.editar(this.id_reabastecimiento,this.obj_reabastecimiento).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }


  
}
