import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpXsrfTokenExtractor, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {
paginaPosts = 0;
nuevoPost = new EventEmitter<Post>();
  constructor(private http: HttpClient,
    private servicio: UsuarioService,
    private fileTransfer: FileTransfer) { }


  getPosts(pull: boolean = false){
    if(pull){
      this.paginaPosts = 0;
    }
    this.paginaPosts++;
   return this.http.get<RespuestaPosts>(`${url}/post/?pagina=${this.paginaPosts}`);
  }
   crearPost( post){
    const headers = new HttpHeaders({
      'x-token': this.servicio.token
    });
    return new Promise(resolve =>{
      this.http.post(`${url}/post`, post, {headers} ).subscribe(resp =>{
        this.nuevoPost.emit(resp['post']);
        resolve(true);
      });
    });
    
  }
  subirImagen(img :string){
    const options: FileUploadOptions = {
      fileKey: 'image',
      headers:{
        'x-token': this.servicio.token
      }
    };
    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(img, `${url}/post/upload`, options).then(data =>{

    }).catch(err =>{
      
    });
  }
}
