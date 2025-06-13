import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Shared {
  constructor() { }
  public filters = {
    ward: '',
    lbody: '',
    station: ''
  };

  public showDetails = false;
  public showFilterFlag = false;
  public selectedMethod: string = '';
  filteredData: any[] = []; 

}
