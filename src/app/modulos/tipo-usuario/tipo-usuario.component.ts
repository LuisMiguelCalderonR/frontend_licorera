import { Component } from '@angular/core';
import { TipoUsuarioService } from 'src/app/servicios/tipo-usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.scss']
})
export class TipoUsuarioComponent {

  t_usuario: any;
  id_t_usuario: any;

  obj_t_usuario= {
    tipo_usuario: "",
  }

  validar_t_usuario= true;
  mform= false;
  botones_form= false;

  constructor(private $t_usuario:TipoUsuarioService){}

  ngOnInit(): void {
    this.consulta();
  }

  consulta(){
    this.$t_usuario.consultar().subscribe((resultado:any) => {
    this.t_usuario = resultado;
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
    this.obj_t_usuario= {
      tipo_usuario: ""
    }
  }

  validar(funcion: any){
    if(this.obj_t_usuario.tipo_usuario== ""){
      this.validar_t_usuario=false;
    }else{
      this.validar_t_usuario= true;
    }

    if(this.validar_t_usuario== true && funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_t_usuario== true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    console.log('ver')
    this.$t_usuario.insertar(this.obj_t_usuario).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar el tipo de usuario ?",
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
        this.$t_usuario.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Tipo de Usuario Eliminado!",
          text: "El tipo de usuario ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_t_usuario= {
      tipo_usuario: items.tipo_usuario
    }
  
    this.id_t_usuario = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$t_usuario.editar(this.id_t_usuario,this.obj_t_usuario).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }






}
