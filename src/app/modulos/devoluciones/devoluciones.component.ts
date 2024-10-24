import { Component } from '@angular/core';
import { DevolucionesService } from 'src/app/servicios/devoluciones.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss']
})
export class DevolucionesComponent {

  devoluciones: any;
  productos: any; 
  proveedor: any;
  id_devolucion: any;

  obj_devoluciones={
    fecha_recoleccion: "",
    orden_devolucion: "",
    cantidad: 0,
    total: 0,
    fo_productos : 0,
    fo_proveedor : 0
  }

  validar_fecha_recoleccion= true;
  validar_orden_devolucion= true;
  validar_cantidad= true;
  validar_total= true;
  validar_productos= true;
  validar_proveedor= true;
  mform= false;
  botones_form= false;

  constructor(private $devoluciones:DevolucionesService,private $productos:ProductosService,private $proveedor:ProveedorService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_productos();
    this.consulta_proveedor();
  }

  consulta(){
    this.$devoluciones.consultar().subscribe((resultado:any) => {
    this.devoluciones = resultado;
    })
  }
  
  consulta_productos(){
    this.$productos.consultar().subscribe((resultado:any) => {
    this.productos = resultado;
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
    this.obj_devoluciones= {
      fecha_recoleccion: "",
      orden_devolucion: "",
      cantidad: 0,
      total: 0,
      fo_productos : 0,
      fo_proveedor : 0
    }
  }

  validar(funcion: any){
    if (this.obj_devoluciones.fecha_recoleccion== ""){
      this.validar_fecha_recoleccion= false;
    }else{
      this.validar_fecha_recoleccion= true;
    }
    
    if (this.obj_devoluciones.orden_devolucion== ""){
      this.validar_orden_devolucion= false;
    }else{
      this.validar_orden_devolucion= true;
    }

    if (this.obj_devoluciones.cantidad== 0){
      this.validar_cantidad= false;
    }else{
      this.validar_cantidad= true;
    }

    if (this.obj_devoluciones.total== 0){
      this.validar_total= false;
    }else{
      this.validar_total= true;
    }

    if (this.obj_devoluciones.fo_productos== 0){
      this.validar_productos= false;
    }else{
      this.validar_productos= true;
    }

    if (this.obj_devoluciones.fo_proveedor== 0){
      this.validar_proveedor= false;
    }else{
      this.validar_proveedor= true;
    }

    if(this.validar_fecha_recoleccion== true && this.validar_orden_devolucion== true && this.validar_cantidad== true && this.validar_total== true && this.validar_productos== true && this.validar_proveedor== true && funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_fecha_recoleccion== true && this.validar_orden_devolucion== true && this.validar_cantidad== true && this.validar_total== true && this.validar_productos== true && this.validar_proveedor== true && funcion== 'editar'){
      this.editar();
    }
  }

    guardar(){
      this.$devoluciones.insertar(this.obj_devoluciones).subscribe((datos: any)=> {
        if(datos['resultado']=='OK'){
          this.consulta();
        }
      });
      this.limpiar();
      this.mostrar_form('no ver');
    }

    eliminar(id:number){
    
      Swal.fire({
        title: "Esta seguro de eliminar la devolucion ?",
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
          this.$devoluciones.eliminar(id).subscribe((datos: any)=> {
            if(datos['resultado']=='OK'){
              this.consulta();
            }
          })
  //////////   
          Swal.fire({
            title: "Devolucion Eliminada!",
            text: "La devolucion ha sido eliminada.",
            icon: "success"
          });
        }
      });
    }

    cargar_datos(items: any, id: number){
      this.obj_devoluciones= {
        fecha_recoleccion: items.fecha_recoleccion,
        orden_devolucion: items.orden_devolucion,
        cantidad: items.cantidad,
        total: items.total,
        fo_productos : items.fo_productos,
        fo_proveedor : items.fo_proveedor
      }
      
      this.id_devolucion = id;
  
      this.botones_form= true;
      this.mostrar_form('ver');
    }
  
    editar(){
      this.$devoluciones.editar(this.id_devolucion,this.obj_devoluciones).subscribe((datos:any)=> {
        if(datos['resultado']=='OK'){
          this.consulta();
          }
      });
      this.limpiar();
      this.mostrar_form('no ver');
    }
  
  
  
}
