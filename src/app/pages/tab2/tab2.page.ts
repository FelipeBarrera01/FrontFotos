import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera ,CameraOptions } from '@ionic-native/camera/ngx';

import { Router } from '@angular/router';
declare var window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  tempImages: string [] = [];
  cargandoGeo = false;
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };
  constructor(private servicio: PostsService,
              private router: Router,
              private geolocation: Geolocation,
              private camera: Camera) {

                                              }
 procesarImagen(options: CameraOptions){
  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    const img = window.Ionic.WebView.convertFileSrc(imageData);
    this.servicio.subirImagen(imageData);
    this.tempImages.push(img);
   }, (err) => {
    // Handle error
   });
 }
 libreria(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
 }
 camara(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  this.procesarImagen(options);
 
 }
async crearPost(){
  const creeado = await  this.servicio.crearPost(this.post);
  this.post = {
    mensaje: '',
    coords: null,
    posicion: false
  };
this.router.navigateByUrl('/main/tabs/tab1');
}
getGeo(){
  if(!this.post.posicion){

    this.post.coords = null;
    return;
  }
  this.cargandoGeo = true;
  this.geolocation.getCurrentPosition().then((resp) => {
    
    this.cargandoGeo = false;
    const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
    this.post.coords = coords;
   }).catch((error) => {
     console.log('Error getting location', error);
     this.cargandoGeo = true;
   });
   

}

}