import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {

  pedidos: any;
  modal = false;
  productos: any

  constructor(private router:Router, private $pedidos:PedidosService){}

  ngOnInit(): void {
    this.consulta();
  }

  consulta(){
    this.$pedidos.consultar().subscribe((result: any)=> {
      this.pedidos= result;
    })
  }

  consultap(id:number){
    this.$pedidos.consultarp(id).subscribe((result: any)=> {
      this.productos= result;
      console.log(this.productos);
      
    })
  }

  insertar(){
    this.router.navigate(['pedidoinsertar'])
  }

  eliminar(id:number){
    
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
        this.$pedidos.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Pedido Eliminado!",
          text: "El pedido ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  mostrar_modal(dato: any, id: number){
    switch(dato){
      case 0:
        this.modal = false;
      break;
      case 1:
        this.modal = true;
        this.consultap(id);
      break;
    }
  }

  

}
