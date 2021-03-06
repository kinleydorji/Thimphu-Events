import { Component, OnInit } from '@angular/core';
import * as leaflet from 'leaflet';
import { Map,Marker } from 'leaflet';
import { AlertController,MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trackgarbagetruck',
  templateUrl: './trackgarbagetruck.page.html',
  styleUrls: ['./trackgarbagetruck.page.scss'],
})
export class TrackgarbagetruckPage implements OnInit {
  mapg: Map;
  latitude:any;
  longitude:any;
  constructor(private route: ActivatedRoute,
    private alertCtrl:AlertController,
    private menu:MenuController) {
    this.latitude=this.route.snapshot.params['latitude'];
    this.longitude=this.route.snapshot.params['longitude'];

   }

  ngOnInit() {
    this.loadMap();
  }
  openMenu(){
    this.menu.toggle('myMenu');
  }
  loadMap()
  {
    this.mapg=leaflet.map("mapg").setZoom(17,{animate:true,duration:0.5});//.panTo([this.latitude,this.longitude]);
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.mapg);
    this.mapg.locate({
      setView: true,
      maxZoom: 20,
    }).on('locationfound', e => {
      let marker=leaflet.marker([this.latitude,this.longitude]).on('click',()=>
      {
          this.alert("Info","Your Location");
      });;
      let markerGroup=leaflet.featureGroup();
      markerGroup.addLayer(marker);
      this.mapg.addLayer(markerGroup);
      }).on('locationerror', (err) => {
        alert(err);
    })
  }
  async alert(header:any,message:any)
  {
    const alert= await this.alertCtrl.create(
      {
       header:header,
       message:message,
       buttons:['OK'], 
      }
    );
    alert.present();
  }
}
