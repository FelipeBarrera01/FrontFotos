import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'imageSanitizer'
})
export class ImageSanitizerPipe implements PipeTransform {
  constructor(private domsSanitizer: DomSanitizer){

  }
  transform(img : any): any {
    return this.domsSanitizer.bypassSecurityTrustUrl(img);
  }

}
