import { Component } from '@angular/core';
import { CiudadService } from 'src/app/servicios/ciudad.service';
import { DepartamentoService } from 'src/app/servicios/departamento.service';
import { ProveedorService } from 'src/app/servicios/proveedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss']
})
export class ProveedorComponent {

  proveedor: any;
  ciudad: any;
  departamento: any;
  id_proveedor: any;

  obj_proveedor={
    nombre: "",
    nit: "",
    contacto: "",
    direccion	: "",
    fo_ciudad : 0,
    fo_dpto : 0
  }

  validar_nombre= true;
  validar_nit= true;
  validar_contacto= true;
  validar_direccion= true;
  validar_ciudad= true;
  validar_dpto= true;
  mform= false;
  botones_form= false;

  constructor(private $proveedor:ProveedorService, private $ciudad:CiudadService, private $departamento:DepartamentoService){}

  ngOnInit(): void {
    this.consulta();
    this.consulta_ciudad();
    this.consulta_dpto();
  }

  consulta(){
    this.$proveedor.consultar().subscribe((resultado:any) => {
    this.proveedor = resultado;
    })
  }

  consulta_ciudad(){
    this.$ciudad.consultar().subscribe((resultado:any) => {
    this.ciudad = resultado;
    })
  }

  consulta_dpto(){
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
      this.botones_form= false;
      break;
    }
  }

  limpiar(){
    this.obj_proveedor= {
      nombre: "",
      nit: "",
      contacto: "",
      direccion	: "",
      fo_ciudad : 0,
      fo_dpto : 0
    }
  }

  validar(funcion: any){
    if (this.obj_proveedor.nombre == ""){
      this.validar_nombre= false;
    }else{
      this.validar_nombre= true;
    }

    if (this.obj_proveedor.nit == ""){
      this.validar_nit= false;
    }else{
      this.validar_nit= true;
    }

    if (this.obj_proveedor.contacto == ""){
      this.validar_contacto= false;
    }else{
      this.validar_contacto= true;
    }

    if (this.obj_proveedor.direccion == ""){
      this.validar_direccion= false;
    }else{
      this.validar_direccion= true;
    }

    if (this.obj_proveedor.fo_ciudad == 0){
      this.validar_ciudad= false;
    }else{
      this.validar_ciudad= true;
    }

    if (this.obj_proveedor.fo_dpto == 0){
      this.validar_dpto= false;
    }else{
      this.validar_dpto= true;
    }

    if(this.validar_nombre== true && this.validar_nit== true && this.validar_contacto== true && this.validar_direccion== true && this.validar_ciudad== true && this.validar_dpto== true && funcion=='guardar'){
      this.guardar();
    }

    if(this.validar_nombre== true && this.validar_nit== true && this.validar_contacto== true && this.validar_direccion== true && this.validar_ciudad== true && this.validar_dpto== true && funcion=='editar'){
      this.editar();
    }
  }

  guardar(){
    this.$proveedor.insertar(this.obj_proveedor).subscribe((datos: any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
      }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  eliminar(id:number){
    
    Swal.fire({
      title: "Esta seguro de eliminar el proveedor ?",
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
        this.$proveedor.eliminar(id).subscribe((datos: any)=> {
          if(datos['resultado']=='OK'){
            this.consulta();
          }
        })
//////////   
        Swal.fire({
          title: "Proveedor Eliminado!",
          text: "El proveedor ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }

  cargar_datos(items: any, id: number){
    this.obj_proveedor= {
      nombre: items.nombre,
      nit: items.nit,
      contacto: items.contacto,
      direccion	: items.direccion,
      fo_ciudad : items.fo_ciudad,
      fo_dpto : items.fo_dpto
    }
  
    this.id_proveedor = id;

    this.botones_form= true;
    this.mostrar_form('ver');
  }

  editar(){
    this.$proveedor.editar(this.id_proveedor,this.obj_proveedor).subscribe((datos:any)=> {
      if(datos['resultado']=='OK'){
        this.consulta();
        }
    });
    this.limpiar();
    this.mostrar_form('no ver');
  }

  
}
