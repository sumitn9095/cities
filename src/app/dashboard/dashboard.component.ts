import { Component, ComponentRef, ElementRef, Injector, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { ActivatedRoute, Params } from '@angular/router';
import { DataFormComponent } from '../data-form/data-form.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataFormCompRef!: ComponentRef<any>
  stateMapId: string = '';
  areaNameSelected: string = '';
  @ViewChild('map') 'map': MapComponent;
  mapType: any;
  private indiaMap: string = '../../../assets/map/India.topo.json';
  constructor(private _ar: ActivatedRoute, private _ds: DataService) { }
  @ViewChild('dataFormContainer', { read: ViewContainerRef }) dataFormContainer!: ViewContainerRef
  ///@ViewChild('dataFormTempRef', { read: TemplateRef }) dataFormTempRef!:TemplateRef<ElementRef>
  ngOnInit(): void {
    this.mapType = {
      type: true,
      area: '',
      name: ''
    };


    this._ar.params.subscribe((params: Params) => {
      //this.screenNo = params["screen"];
      this.stateMapId = params["id"];
      // --------
      if (this.stateMapId) {
        this.mapType.area = "../assets/map/states/" + this.stateMapId + ".json";
        this.areaNameSelected = this.stateMapId;
        this.mapType.name = this.stateMapId;
        this.mapType.type = false;
        // this._cs.locateArea(this.stateMapId, 'loaded');
        // this._cs.setReloadDashboardApi('loadDashboardGraphs', this.stateMapId);

      } else {
        this.mapType.area = this.indiaMap;
        this.mapType.name = '';
        this.areaNameSelected = '';
        // this._cs.locateArea(this.areaNameSelected, 'loaded');
        this.mapType.type = true;
      }
    });
  }

  citySelectedEvent($event: any) {
    console.log("$event", $event)
    this.dataFormCompRef = this.dataFormContainer.createComponent(DataFormComponent, {
      injector: Injector.create({
        providers: [
          { provide: 'cropData', useValue: { state: $event.state, city: $event.city } }
        ]
      })
    })
  }


  getCropsData() {
    this._ds.getCropsData().subscribe({
      next: (w: any) => {
        console.log("getCropsData", w);
      }
    })
  }
}
