import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  correo: any;
  usuario: any;
  clave: any;
  error= false;
  user={
    nombre_usuario: "",
    numero_identificacion: "",
    correo: "",
    contacto: "",
    direccion: "",
    clave: "",
    fo_tipo_usuario: 0,
  }

  constructor(private $login: LoginService, private router: Router){}

  ngOnInit(): void {
    sessionStorage.setItem("id", "");
    sessionStorage.setItem("nombre", "");
    sessionStorage.setItem("correo", "");
    sessionStorage.setItem("rol", "");
    
  }

  consulta(tecla:any){
    if(tecla == 13 || tecla == ""){
      this.$login.consultar(this.correo, this.clave).subscribe((resultado: any)=>{
        this.usuario = resultado;
        console.log(this.usuario)

        if(this.usuario[0].validar=="valida"){
          sessionStorage.setItem("id", this.usuario[0]['id_usuario']);
          sessionStorage.setItem("nombre", this.usuario[0]['nombre_usuario']);
          sessionStorage.setItem("correo", this.usuario[0]['correo']);
          sessionStorage.setItem("rol", this.usuario[0]['rol']);
          this.router.navigate(['dashboard']);
        }else{
          console.log("no entro")
          this.error=true;
        }
      })
    }
  }
  
}
