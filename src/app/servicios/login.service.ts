import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost/software_licorera/backend/controlador/login.php';


  constructor(private http: HttpClient) { }

  consultar(correo: any, clave: any){
    console.log(`${this.url}?correo=${correo}&clave=${clave}`);
    return this.http.get(`${this.url}?correo=${correo}&clave=${clave}`);
  }

}


