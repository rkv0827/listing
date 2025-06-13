import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';
import { Location } from '@angular/common';
import { Shared } from '../../service/shared';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Home } from '../home/home';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrl: './view.css'
})
export class View implements AfterViewInit {
   displayedColumns: string[] = ['ward', 'lbody', 'name', 'gname', 'gage', 'station', 'idno', 'hno', 'hname'];
  dataSource = new MatTableDataSource<any>([]);
  showfilter=false;
  filterstring:string='';
  excelData: any[] = [];
    headers: string[] = [];
    Name:any[]=[];
   sm: string | null = null;
   showdetails = false;
   filters = {
    ward: '',
    lbody: '',
    station: ''
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private router:Router,private location:Location,private shared:Shared){}
  showbutton=false
  ngOnInit() {
     const storedData = localStorage.getItem('excelData');

    if (storedData) {
      this.excelData = JSON.parse(storedData);
    } else {
      this.excelData = []; 
    }
    this.dataSource = new MatTableDataSource(this.excelData);
    this.dataSource.paginator = this.paginator;
   this.filters = {
    ward: this.shared.filters.ward?.toLowerCase() || '',
    lbody: this.shared.filters.lbody?.toLowerCase() || '',
    station: this.shared.filters.station?.toLowerCase() || ''
  };
   this.showfilter = this.shared.showFilterFlag;
   this.filteredData = [...this.excelData]; 
   this.sm=localStorage.getItem('sm');
   this.display();
     if (this.showfilter) {
  this.applyFilters(); 
  this.shared.showFilterFlag = false; 
} else {
    this.filteredData = [...this.excelData];
  }
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
applyFilters(): void {
  console.log(this.filteredData);
 const matchResults = this.excelData.filter(item => {
  const matchWard = this.filters.ward
    ? String(item.ward || '').toLowerCase().includes(this.filters.ward)
    : true;

  const matchLbody = this.filters.lbody
    ? String(item.lbody || '').toLowerCase().includes(this.filters.lbody)
    : true;

  const matchStation = this.filters.station
    ? String(item.station || '').toLowerCase().includes(this.filters.station)
    : true;

  return matchWard && matchLbody && matchStation;
});


  this.filteredData = matchResults;
 console.log(matchResults);
  if (matchResults.length > 0 && this.filterstring.trim()) {
    const lowerFilter = this.filterstring.toLowerCase();
    this.filteredData = matchResults.filter(row =>
      typeof row.name === 'string' && row.name.toLowerCase().includes(lowerFilter)
    );
  }
  
  this.dataSource.data = this.filteredData ;
}


  adddata(){
    this.router.navigate(['/Adddata'])
  }
 display(): void {
  const storedData = localStorage.getItem('excelData');
  if (storedData) {
    try {
      this.excelData = JSON.parse(storedData);
      if (this.sm !== 'Normal') {
        if (this.excelData.length > 0) {
          this.headers = Object.keys(this.excelData[0]);
        }
      }
      this.filteredData = [...this.excelData];
    } catch (error) {
      console.error('Error parsing JSON from localStorage', error);
    }
  }
}


  filteredData = [...this.excelData]; 
  filterData(): void {
    this.dataSource.filter = this.filterstring.trim().toLowerCase();
  const filterValue = this.filterstring.toLowerCase().trim();
  if (!filterValue) {
    this.filteredData = [...this.excelData];  
  } else {
    this.filteredData = this.excelData.filter(row =>
      row.name?.toLowerCase().includes(filterValue)
    );
  }
 this.dataSource.data = this.filteredData ; 
}
  viewDetails(row: any) {
  const id = row['idno']; 
  this.router.navigate(['/Card', id]);
}
back(){
  localStorage.removeItem('logindetails');
  this.router.navigate(['']);
}
filter(){
  this.router.navigate(['/Home']);
}
  
}
