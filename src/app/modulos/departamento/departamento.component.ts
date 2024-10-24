import { Component } from '@angular/core';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent {

  departamento: any;
  id_departamento: any;

  obj_dpto={
    nombre: ""
  }

  validar_nombre= true;
  mform= false;
  botones_form = false;

  constructor(private $departamento:DepartamentoService){}

  ngOnInit(): void {
    this.consulta();
  }

  consulta(){
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
    this.obj_dpto= {
      nombre: ""
    }
  }

  validar(funcion: any){
    if(this.obj_dpto.nombre == ""){
      this.validar_nombre=false;
    }else{
      this.validar_nombre=true;
    }

    if(this.validar_nombre==true && funcion== 'guardar'){
      this.guardar();
    }

    if(this.validar_nombre==true && funcion== 'editar'){
      this.editar();
    }
  }

  guardar(){
    console.log('ver')
    this.$departamento.insertar(this.obj_dpto).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar el departamento ?",
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
        this.$departamento.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Departamento Eliminado!",
          text: "El departamento ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_dpto= {
      nombre: items.nombre
    }
  
    this.id_departamento = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$departamento.editar(this.id_departamento,this.obj_dpto).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }






}
