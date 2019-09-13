import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild('slidePrincipal',{static: false}) slides: IonSlides;
 

loginUser = {
  email: '',
  password:''
};
registerUser: Usuario = {
  email: '',
  password: '',
  nombre: '',
  avatar: ''
};
  constructor(private servicio: UsuarioService,
              private navCtrl: NavController,
              private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }
  monstrarRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
     this.slides.lockSwipes(true);
  }
mostrarLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);
}
 async login(fLogin: NgForm){
    if(fLogin.invalid){return;}
   const valido = await this.servicio.login(this.loginUser.email, this.loginUser.password);
   if(valido){
    this.navCtrl.navigateRoot('/main/tabs/tab1', {animated : true});
   }else{
    this.uiService.presentAlert('Usuario y contraseña no son correctas');
   }
  }
 async registro(fRegistro: NgForm){
    if(fRegistro.invalid){
      return;
    }
   const valido = await this.servicio.registro(this.registerUser);
    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated : true});
     }else{
      this.uiService.presentAlert('Ese correo electronico ya existe');
     }
  }
  
}
