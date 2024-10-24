import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.scss']
})
export class CiudadComponent {

  ciudad: any;
  departamento: any;
  id_ciudad: any;

  obj_ciudad={
    nombre: "",
    fo_dpto: 0
  }

  validar_nombre= true;
  validar_departamento= true;
  mform= false;
  botones_form= false;

  constructor(private $ciudad:CiudadService, private $departamento:DepartamentoService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_departamento();
  }

  consulta(){
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
    this.obj_ciudad={
      nombre: "",
      fo_dpto: 0
    }
  }

  validar(funcion: any){
    if(this.obj_ciudad.nombre == ""){
      this.validar_nombre= false;
    }else{
      this.validar_nombre= true;
    }
    
    if(this.obj_ciudad.fo_dpto == 0){
      this.validar_departamento= false;
    }else{
      this.validar_departamento= true;
    }

    if(this.validar_nombre == true && this.validar_departamento == true && funcion=='guardar'){
      this.guardar();
    }
    if(this.validar_nombre == true && this.validar_departamento == true && funcion=='editar'){
      this.editar();
    }
  }

  guardar(){
    this.$ciudad.insertar(this.obj_ciudad).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar la ciudad ?",
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
        this.$ciudad.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Ciudad Eliminada!",
          text: "La ciudad ha sido eliminada.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_ciudad={
      nombre: items.nombre,
      fo_dpto: items.fo_dpto
    }

    this.id_ciudad = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$ciudad.editar(this.id_ciudad,this.obj_ciudad).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }




}
