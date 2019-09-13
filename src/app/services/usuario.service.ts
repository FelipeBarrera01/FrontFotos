import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/interfaces';




const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
token: string = null;

  constructor(private http: HttpClient,
              private storage: Storage) { }

login(email:string, passwor: string){

const data = {email, passwor};
return new Promise (resolve =>{
     this.http.post(`${url}/user/login`, data).subscribe(resp =>{
  if(resp['ok']){
    this.guardarToken(resp['token']);
    resolve(true);
  }else{
    this.token = null;
    this.storage.clear();
    resolve(false);
  }

});
});

}
registro(usuario: Usuario){
 return new Promise(resolve =>{
   this.http.post(`${url}/user/create`, usuario).subscribe(resp =>{
    if(resp['ok']){
      this.guardarToken(resp['token']);
      resolve(true);
    }else{
      this.token = null;
      this.storage.clear();
      resolve(false);
    }
   }); 
 }); 
}
async guardarToken(token: string){
  this.token = token;
 await this.storage.set('token', token);
}

}


