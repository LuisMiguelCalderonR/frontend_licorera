import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {

  cliente: any;
  ciudad: any;
  departamento: any;
  id_cliente: any;

  obj_cliente= {
    nombre:"",
    tipo_identificacion:"",
    numero_identificacion:"",
    correo:"",
    direccion:"",
    numero_contacto:"",
    fo_ciudad:0, 
    fo_dpto:0 
  }

  validar_nombre= true;
  validar_tipo_identificacion= true;
  validar_numero_identificacion= true;
  validar_correo= true;
  validar_direccion= true;
  validar_numero_contacto= true;
  validar_ciudad= true;
  validar_departamento= true;
  mform= false;
  botones_form= false;

  constructor(private $cliente:ClienteService, private $ciudad:CiudadService, private $departamento:DepartamentoService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_ciudad();
    this.consulta_departamento();
  }

  consulta(){
    this.$cliente.consultar().subscribe((resultado:any) => {
    this.cliente = resultado;
    })
  }

  consulta_ciudad(){
    this.$ciudad.consultar().subscribe((resultado:any) => {
    this.ciudad = resultado;
    })
  }

  consulta_departamento(){
    this.$departamento.consultar().subscribe((resultado:any) => {
    this.departamento = resultado;
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
    this.obj_cliente= {
      nombre:"",
      tipo_identificacion:"",
      numero_identificacion:"",
      correo:"",
      direccion:"",
      numero_contacto:"",
      fo_ciudad:0, 
      fo_dpto:0 
    }
  }

  validar(funcion: any){
    if (this.obj_cliente.nombre == ""){
      this.validar_nombre= false;
    }else{
      this.validar_nombre= true;
    }

    if (this.obj_cliente.tipo_identificacion == ""){
      this.validar_tipo_identificacion= false;
    }else{
      this.validar_tipo_identificacion= true;
    }

    if (this.obj_cliente.numero_identificacion == ""){
      this.validar_numero_identificacion= false;
    }else{
      this.validar_numero_identificacion= true;
    }

    if (this.obj_cliente.correo == ""){
      this.validar_correo= false;
    }else{
      this.validar_correo= true;
    }

    if (this.obj_cliente.direccion == ""){
      this.validar_direccion= false;
    }else{
      this.validar_direccion= true;
    }

    if (this.obj_cliente.numero_contacto == ""){
      this.validar_numero_contacto= false;
    }else{
      this.validar_numero_contacto= true;
    }

    if (this.obj_cliente.fo_ciudad == 0){
      this.validar_ciudad= false;
    }else{
      this.validar_ciudad= true;
    }

    if (this.obj_cliente.fo_dpto == 0){
      this.validar_departamento= false;
    }else{
      this.validar_departamento= true;
    }

    if(this.validar_nombre== true && this.validar_tipo_identificacion== true && this.validar_numero_identificacion== true && this.validar_correo== true && this.validar_direccion== true && this.validar_numero_contacto== true && this.validar_ciudad== true && this.validar_departamento== true && funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_nombre== true && this.validar_tipo_identificacion== true && this.validar_numero_identificacion== true && this.validar_correo== true && this.validar_direccion== true && this.validar_numero_contacto== true && this.validar_ciudad== true && this.validar_departamento== true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.$cliente.insertar(this.obj_cliente).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar el cliente ?",
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
        this.$cliente.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Cliente Eliminado!",
          text: "El cliente ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_cliente= {
      nombre:items.nombre,
      tipo_identificacion:items.tipo_identificacion,
      numero_identificacion:items.numero_identificacion,
      correo:items.correo,
      direccion:items.direccion,
      numero_contacto:items.numero_contacto,
      fo_ciudad:items.fo_ciudad, 
      fo_dpto:items.fo_dpto 
    }  
    this.id_cliente = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$cliente.editar(this.id_cliente,this.obj_cliente).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }





}
