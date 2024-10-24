import { Component } from '@angular/core';
import { TipoUsuarioService } from 'src/app/servicios/tipo-usuario.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent {

  usuario: any;
  tipo_usuario: any;
  id_usuario: any;

  obj_usuario= {
    nombre_usuario: "",
    numero_identificacion: "",
    correo: "",
    contacto: "",
    direccion: "",
    clave: "",
    fo_tipo_usuario : 0
  }

  validar_nombre_usuario= true;
  validar_numero_identificacion= true;
  validar_correo= true;
  validar_contacto= true;
  validar_direccion= true;
  validar_clave= true;
  validar_tipo_usuario= true;
  mform=false;
  botones_form= false;


  constructor(private $usuario:UsuarioService, private $tipo_usuario:TipoUsuarioService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_t_usuario();
  }

  consulta(){
    this.$usuario.consultar().subscribe((resultado:any) => {
    this.usuario = resultado;
    })
  }

  consulta_t_usuario(){
    this.$tipo_usuario.consultar().subscribe((resultado:any) => {
    this.tipo_usuario = resultado;
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
    this. obj_usuario= {
      nombre_usuario: "",
      numero_identificacion: "",
      correo: "",
      contacto: "",
      direccion: "",
      clave: "",
      fo_tipo_usuario: 0
    }
  }

  validar(funcion: any){
    if(this.obj_usuario.nombre_usuario== ""){
      this.validar_nombre_usuario= false;
    }else{
      this.validar_nombre_usuario= true;
    }

    if(this.obj_usuario.numero_identificacion== ""){
      this.validar_numero_identificacion= false;
    }else{
      this.validar_numero_identificacion= true;
    }

    if(this.obj_usuario.correo== ""){
      this.validar_correo= false;
    }else{
      this.validar_correo= true;
    }

    if(this.obj_usuario.contacto== ""){
      this.validar_contacto= false;
    }else{
      this.validar_contacto= true;
    }

    if(this.obj_usuario.direccion== ""){
      this.validar_direccion= false;
    }else{
      this.validar_direccion= true;
    }

    if(this.obj_usuario.clave== ""){
      this.validar_clave= false;
    }else{
      this.validar_clave= true;
    }

    if(this.obj_usuario.fo_tipo_usuario== 0){
      this.validar_tipo_usuario= false;
    }else{
      this.validar_tipo_usuario= true;
    }

    if(this.validar_nombre_usuario== true && this.validar_numero_identificacion== true && this.validar_correo== true && this.validar_contacto== true && this.validar_direccion== true && this.validar_clave== true &&this.validar_tipo_usuario== true && funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_nombre_usuario== true && this.validar_numero_identificacion== true && this.validar_correo== true && this.validar_contacto== true && this.validar_direccion== true && this.validar_clave== true &&this.validar_tipo_usuario== true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    this.$usuario.insertar(this.obj_usuario).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar el usuario ?",
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
        this.$usuario.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Usuario Eliminado!",
          text: "El usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this. obj_usuario= {
      nombre_usuario: items.nombre_usuario,
      numero_identificacion: items.numero_identificacion,
      correo: items.correo,
      contacto: items.contacto,
      direccion: items.direccion,
      clave: items.clave,
      fo_tipo_usuario: items.fo_tipo_usuario
    }
  
    this.id_usuario = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$usuario.editar(this.id_usuario,this.obj_usuario).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }




}
