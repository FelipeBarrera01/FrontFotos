import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  usuario: Usuario = {};
  constructor(private servicio: UsuarioService,private uiServicio: UiServiceService, private postService: PostsService) {}

  logout(){
    this.postService.paginaPosts = 0;
    this.servicio.logout();
  }
ngOnInit(){
this.usuario = this.servicio.getUsuario();
}
async actualizar(fActualizar: NgForm){
  if(fActualizar.invalid){
    return;
  }
  const actualizado = await this.servicio.actualizarUsuario(this.usuario);
  if(actualizado){
    this.uiServicio.presentToast('Actualizado');
  }else{
    this.uiServicio.presentToast('No fue posible actualizar');
  }
}
}
