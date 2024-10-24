import { Component } from '@angular/core';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { PagoService } from 'src/app/servicios/pago.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VentasService } from 'src/app/servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent {

  pago: any;
  ventas: any;
  cliente: any;
  usuario: any;
  id_pago: any;

  obj_pago={
    medio_pago: "",
    fo_ventas:0,
    fo_cliente:0,
    fo_usuario:0
  }

  validar_medio_pago= true;
  validar_ventas= true;
  validar_cliente= true;
  validar_usuario= true;
  mform= false;
  botones_form= false;

  constructor(private $pago:PagoService, private $ventas:VentasService, private $cliente:ClienteService, private $usuario:UsuarioService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_ventas();
    this.consulta_cliente();
    this.consulta_usuario();
  }

  consulta(){
    this.$pago.consultar().subscribe((resultado:any) => {
    this.pago = resultado;
    })
  }

  consulta_ventas(){
    this.$ventas.consultar().subscribe((resultado:any) => {
    this.ventas = resultado;
    })
  }

  consulta_cliente(){
    this.$cliente.consultar().subscribe((resultado:any) => {
    this.cliente = resultado;
    })
  }

  consulta_usuario(){
    this.$usuario.consultar().subscribe((resultado:any) => {
    this.usuario = resultado;
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
    this.obj_pago= {
      medio_pago: "",
      fo_ventas:0,
      fo_cliente:0,
      fo_usuario:0
    }
  }

  validar(funcion: any){
    if (this.obj_pago.medio_pago == ""){
      this.validar_medio_pago= false;
    }else{
      this.validar_medio_pago= true;
    }

    if (this.obj_pago.fo_ventas == 0){
      this.validar_ventas= false;
    }else{
      this.validar_ventas= true;
    }

    if (this.obj_pago.fo_cliente == 0){
      this.validar_cliente= false;
    }else{
      this.validar_cliente= true;
    }

    if (this.obj_pago.fo_usuario == 0){
      this.validar_usuario= false;
    }else{
      this.validar_usuario= true;
    }

    if(this.validar_medio_pago== true && this.validar_ventas== true && this.validar_cliente== true && this.validar_usuario== true && funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_medio_pago== true && this.validar_ventas== true && this.validar_cliente== true && this.validar_usuario== true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.$pago.insertar(this.obj_pago).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar el pago ?",
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
        this.$pago.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Pago Eliminado!",
          text: "El Pago ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_pago= {
      medio_pago: items.medio_pago,
      fo_ventas:items.fo_ventas,
      fo_cliente:items.fo_cliente,
      fo_usuario:items.fo_usuario
    }
  
    this.id_pago = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$pago.editar(this.id_pago,this.obj_pago).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }







  
}
