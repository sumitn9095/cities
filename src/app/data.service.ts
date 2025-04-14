import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  cropsData = new BehaviorSubject<any>({});
  cropsDataArrBs = new BehaviorSubject<any>({});
  cropsDataArr: any[] = [];
  selectedState: string = '';
  setCropsData(stateName: string, cityName: string, cropsDataObj: {}) {
    this.cropsDataArr.push({ state: stateName, city: cityName, cropsData: cropsDataObj });
    //this.cropsData.next({ state: stateName, city: cityName, cropsData: cropsDataObj });
    this.cropsDataArrBs.next(this.cropsDataArr);
  }

  getCropsData() {
    return this.cropsDataArrBs.asObservable();
  }
}
