import { Component, OnInit, Input, ViewChild } from '@angular/core';
declare var mapboxgl: any;
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit {

  @Input() coords: string;
  @ViewChild('mapa', {static: false}) mapa ;
  constructor(
  ) { 

  }

  ngOnInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[0]);

    mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsaXBlYmFycmVyYTk5IiwiYSI6ImNrMGVlZzkzazBoY3ozbHFkMm9hcmVpZ3MifQ.7oPfV80jYdn7lEIpP362eg';
    var map = new mapboxgl.Map({
    container: this.mapa.nativeElement,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng , lat],
    zoom: 15
    });
    const marker = mapboxgl.Marker().setLngLat( [lng , lat]).addTo(map);
  }

}
