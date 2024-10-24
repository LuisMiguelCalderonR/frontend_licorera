import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  productos: any;
  categoria: any;
  id_productos: any;

  obj_productos= {
    nombre: "",
    codigo: "",
    precio_und: 0,
    precio_venta: 0,
    cantidad_stock: 0,
    fo_categoria : 0
  }

  validar_nombre= true;
  validar_codigo= true;
  validar_precio_und= true;
  validar_precio_venta= true;
  validar_cantidad_stock= true;
  validar_categoria= true;
  mform= false;
  botones_form= false;

  constructor(private $productos:ProductosService, private $categoria:CategoriaService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_categoria();
  }

  consulta(){
    this.$productos.consultar().subscribe((resultado:any) => {
    this.productos = resultado;
    })
  }

  consulta_categoria(){
    this.$categoria.consultar().subscribe((resultado:any) => {
    this.categoria = resultado;
    })
  }

  mostrar_form(dato: any){
    switch(dato){
      case "ver":
      this.mform = true;
      break;
      case "no ver":
      this.mform = false;
      this.botones_form = false;
      break;
    }
  }

  limpiar(){
    this.obj_productos= {
      nombre: "",
      codigo: "",
      precio_und: 0,
      precio_venta: 0,
      cantidad_stock: 0,
      fo_categoria : 0
    }
  }

  validar(funcion: any){
    if (this.obj_productos.nombre == ""){
      this.validar_nombre= false;
    }else{
      this.validar_nombre= true;
    }

    if (this.obj_productos.codigo == ""){
      this.validar_codigo= false;
    }else{
      this.validar_codigo= true;
    }

    if (this.obj_productos.precio_und == 0){
      this.validar_precio_und= false;
    }else{
      this.validar_precio_und= true;
    }

    if (this.obj_productos.precio_venta == 0){
      this.validar_precio_venta= false;
    }else{
      this.validar_precio_venta= true;
    }

    if (this.obj_productos.cantidad_stock == 0){
      this.validar_cantidad_stock= false;
    }else{
      this.validar_cantidad_stock= true;
    }

    if (this.obj_productos.fo_categoria == 0){
      this.validar_categoria= false;
    }else{
      this.validar_categoria= true;
    }

    if(this.validar_nombre== true && this.validar_codigo== true && this.validar_precio_und== true && this.validar_precio_venta== true && this.validar_cantidad_stock== true && this.validar_categoria== true && funcion== 'guardar' ){
      this.guardar();
    }
    
    if(this.validar_nombre== true && this.validar_codigo== true && this.validar_precio_und== true && this.validar_precio_venta== true && this.validar_cantidad_stock== true && this.validar_categoria== true && funcion== 'editar' ){
      this.editar();
    }
  }

  guardar(){
    this.$productos.insertar(this.obj_productos).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar el producto ?",
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
        this.$productos.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Producto Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_productos= {
      nombre: items.nombre,
      codigo: items.codigo,
      precio_und: items.precio_und,
      precio_venta: items.precio_venta,
      cantidad_stock: items.cantidad_stock,
      fo_categoria : items.fo_categoria
    }
  
    this.id_productos = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$productos.editar(this.id_productos,this.obj_productos).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }


}
