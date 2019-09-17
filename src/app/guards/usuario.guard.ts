import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements  CanLoad {

    constructor( private servicio: UsuarioService ){
    
    }
  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    return this.servicio.validaToken();
  }
}
