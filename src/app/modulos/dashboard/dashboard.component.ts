import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  nombre: any;
  rol: any;

  constructor(private router: Router){}
  
  ngOnInit(): void{
    this.nombre = sessionStorage.getItem('nombre');
    this.rol = sessionStorage.getItem('rol');
  }

}
