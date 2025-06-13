import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardview',
  standalone: false,
  templateUrl: './cardview.html',
  styleUrl: './cardview.css'
})
export class Cardview {
  cardId: string | null = null;
  parsed: any[] = [];
  Id: any[] = [];   
  name: any[] = [];
  houseno: any[] = [];
  house: any[] = [];
  gage: any[] = [];
  gname: any[] = [];
  gender: string | null = null;
  Age: string | null = null;
  selectedIndex = 0;

  constructor(private route: ActivatedRoute,private location:Location,private router:Router) {}

  ngOnInit(): void {
    this.cardId = this.route.snapshot.paramMap.get('id');
     const storedata=localStorage.getItem('excelData');
     if(storedata){
      this.parsed=JSON.parse(storedata);
      const idnos = this.parsed.map((item: any) => item.idno);
     this.Id=idnos;
     }
     for (let i = 0; i < this.Id.length; i++) {
      if (this.Id[i] === this.cardId) {
        this.selectedIndex = i; 
        break; 
       }
    }
    const names = this.parsed.map((item: any) => item.name);
    const housenos = this.parsed.map((item: any) => item.hno);
    const houses = this.parsed.map((item: any) => item.hname);
    const gnames = this.parsed.map((item: any) => item.gname);
    const gages = this.parsed.map((item: any) => item.gage);
    this.name=names[this.selectedIndex];
    this.houseno=housenos[this.selectedIndex];
    this.house=houses[this.selectedIndex];
    this.gname=gnames[this.selectedIndex];
   const selectedGage = gages[this.selectedIndex];

if (typeof selectedGage === 'string') {
 
  const splitValue = selectedGage.split('/');

  this.gender= splitValue[0];  
  this.Age = splitValue[1];  

} else {
  console.log('Selected value is not a string');
}

  }
  back(){
    this.location.back();
  }
}
