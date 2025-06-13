import { Component  } from '@angular/core';
import { Inject, PLATFORM_ID } from '@angular/core';
import { Location } from '@angular/common';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';
import { Shared } from '../../service/shared';
import { Modal } from 'bootstrap';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  stationList=['A station','B station']
  excelData: any[] = [];  
  filteredData: any[] = [];   
  constructor(private location:Location,private router:Router,private shared:Shared){}
  filters = {
    ward: '',
    lbody: '',
    station: ''
  };
 sm: string | null = null;
 showdetails = false;
   ngOnInit(): void {
    
  }



  onSearch() {
    this.shared.filters = this.filters;
    this.shared.showFilterFlag = true;  
    this.router.navigate(['/View']);
}

  back(){
    this.location.back();
  }
onclear(){
this.filters.ward='';
this.filters.lbody='';
this.filters.station='';
}

}
