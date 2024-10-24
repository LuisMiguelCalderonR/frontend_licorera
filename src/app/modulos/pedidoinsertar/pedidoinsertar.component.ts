import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { ProductosService } from 'src/app/servicios/productos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pedidoinsertar',
  templateUrl: './pedidoinsertar.component.html',
  styleUrls: ['./pedidoinsertar.component.scss']
})
export class PedidoinsertarComponent {

  productos: any;
  cliente: any;
  identificacion_cliente= "";
  nombre_cliente= "";
  id_cliente: any;
  matriz_productos: any= [];
  arreglo_productos: any= [];
  total: any;

  pedido= {
      fecha: "",
      fo_cliente: 0,
      productos: [],
      subtotal: 0,
      total: 0,
      fo_usuario: 0
  }

  constructor(private router: Router, private $productos: ProductosService, private $cliente: ClienteService, private $pedidos:PedidosService){}

  ngOnInit(): void{
    this.consulta_productos();
  }

  consulta_productos(){
    this.$productos.consultar().subscribe((result: any)=>{
      this.productos = result;
    })
  }

  consulta_cliente(){
    this.$cliente.consulta_cliente(this.identificacion_cliente).subscribe((result: any)=>{
      if(result && result.length > 0){
        this.cliente = result;
        this.nombre_cliente = this.cliente[0].nombre;
        //this.id_cliente = this.cliente[0].id_cliente;
        console.log(this.cliente);
      } else {
        this.cliente = null;
        this.nombre_cliente = '';
        //this.id_cliente = null;
        console.log('No se encontró información');
      }
    })
  }

  seleccionar(valores:any, id:number){
    let cantidad = Number(prompt("Ingrese la cantidad a llevar"));
    this.arreglo_productos = [valores.nombre, valores.codigo, Number(valores.precio_venta), cantidad, cantidad * Number(valores.precio_venta)];
    this.matriz_productos.push(this.arreglo_productos);
    
    let largo = this.matriz_productos.length;
    this.total = 0;
    for(let i=0; i<largo; i++ ){
      this.total = this.total + this.matriz_productos[i][4];
    }
    
  }

  eliminarProducto(indice: number) {
    Swal.fire({
      title: "Esta seguro de eliminar el pedido ?",
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
        
  if (indice >= 0 && indice < this.matriz_productos.length) {
    this.total -= this.matriz_productos[indice][4];
    this.matriz_productos.splice(indice, 1);
    } else {
      console.log("Índice inválido");
    }

  //////////   
        Swal.fire({
          title: "Pedido Eliminado!",
          text: "El pedido ha sido eliminado.",
          icon: "success"
        });
      }
    });
    
  }

  guardar(){
    let fecha = new Date();
    //console.log(this.matriz_productos);
    
    this.pedido.fecha =`${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
    this.pedido.fo_cliente= Number(this.cliente[0].id_cliente);
    this.pedido.productos= this.matriz_productos;
    this.pedido.subtotal= this.total;
    this.pedido.total= this.total;
    this.pedido.fo_usuario= Number(sessionStorage.getItem('id'));
    console.log(this.pedido);

    this.$pedidos.insertar(this.pedido).subscribe((datos: any)=> {
      if(datos['resultado'] == 'OK'){
        console.log(datos['resultado']);
        this.router.navigate(['pedidos']);
      }
    });
  }

}
