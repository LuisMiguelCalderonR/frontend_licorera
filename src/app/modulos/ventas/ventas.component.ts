import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VentasService } from 'src/app/servicios/ventas.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent {

  ventas: any;
  usuario: any;
  cliente: any;
  productos: any;
  id_ventas: any;

  obj_ventas= {
    fecha: "",
    numero_factura: "",
    cantidad: 0,
    total: 0,
    fo_usuario: 0,
    fo_cliente: 0,
    fo_productos: 0,
  }

  validar_fecha= true;
  validar_numero_factura= true;
  validar_cantidad= true;
  validar_total= true;
  validar_usuario= true;
  validar_cliente= true;
  validar_productos= true;
  mform= false;
  botones_form= false;


  constructor(private $ventas:VentasService, private $usuario:UsuarioService, private $cliente:ClienteService, private $productos:ProductosService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_usuario();
    this.consulta_cliente();
    this.consulta_productos();
  }

  consulta(){
    this.$ventas.consultar().subscribe((resultado:any) => {
    this.ventas = resultado;
    })
  }

  consulta_usuario(){
    this.$usuario.consultar().subscribe((resultado:any) => {
    this.usuario = resultado;
    })
  }

  consulta_cliente(){
    this.$cliente.consultar().subscribe((resultado:any) => {
    this.cliente = resultado;
    })
  }

  consulta_productos(){
    this.$productos.consultar().subscribe((resultado:any) => {
    this.productos = resultado;
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
    this.obj_ventas= {
      fecha: "",
      numero_factura: "",
      cantidad: 0,
      total: 0,
      fo_usuario: 0,
      fo_cliente: 0,
      fo_productos: 0,
    }
  }

  validar(funcion:any){
    if(this.obj_ventas.fecha== ""){
      this.validar_fecha= false;
    }else{
      this.validar_fecha= true;
    }

    if(this.obj_ventas.numero_factura== ""){
      this.validar_numero_factura= false;
    }else{
      this.validar_numero_factura= true;
    }

    if(this.obj_ventas.cantidad== 0){
      this.validar_cantidad= false;
    }else{
      this.validar_cantidad= true;
    }

    if(this.obj_ventas.total== 0){
      this.validar_total= false;
    }else{
      this.validar_total= true;
    }

    if(this.obj_ventas.fo_usuario== 0){
      this.validar_usuario= false;
    }else{
      this.validar_usuario= true;
    }

    if(this.obj_ventas.fo_cliente== 0){
      this.validar_cliente= false;
    }else{
      this.validar_cliente= true;
    }

    if(this.obj_ventas.fo_productos== 0){
      this.validar_productos= false;
    }else{
      this.validar_productos= true;
    }

    if(this.validar_fecha== true && this.validar_numero_factura== true && this.validar_cantidad== true && this.validar_total== true && this.validar_usuario== true && this.validar_cliente== true &&this.validar_productos== true && funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_fecha== true && this.validar_numero_factura== true && this.validar_cantidad== true && this.validar_total== true && this.validar_usuario== true && this.validar_cliente== true &&this.validar_productos== true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.$ventas.insertar(this.obj_ventas).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar la venta ?",
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
        this.$ventas.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Venta Eliminada!",
          text: "La venta ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_ventas= {
      fecha: items.fecha,
      numero_factura: items.numero_factura,
      cantidad: items.cantidad,
      total: items.total,
      fo_usuario: items.fo_usuario,
      fo_cliente: items.fo_cliente,
      fo_productos: items.fo_productos
    }
  
    this.id_ventas= id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$ventas.editar(this.id_ventas,this.obj_ventas).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }






}
