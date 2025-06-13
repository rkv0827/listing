import { Component } from '@angular/core';
import { stringify } from 'querystring';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { findIndex } from 'rxjs';

@Component({
  selector: 'app-addnew',
  standalone: false,
  templateUrl: './addnew.html',
  styleUrl: './addnew.css'
})
export class Addnew {
  multipleEntries: any[] = [];
  filters = {
    ward: '',
    lbody: '',
    station: '',
    name:'',
    gname:'',
    hno:'',
    gage:'',
    idno:'',
    hname:''
  };
  constructor(private router:Router,private location:Location){}
  jsonData: any[] = [];
  selectedMethod: string = '';
  onFileChange(event: any): void {
  const target: DataTransfer = <DataTransfer>(event.target);

  if (target.files.length !== 1) {
    console.error('Cannot use multiple files');
    return;
  }

  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    const bstr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    const data: Record<string, any>[] = XLSX.utils.sheet_to_json(ws);

    const newEntries = data.map((row: any) => ({
      ward: row['Ward'] || '',
      lbody: row['Local Body'] || '',
      name: row['Name'] || '',
      gname: row['Guardian Name'] || '',
      gage: row['Gender / Age'] || '',
      station: row['Station'] || '',
      idno: row['ID Card No.'] || '',
      hno: row['New House No.'] || '',
      hname: row['House Name'] || ''
    }));

    // Read existing data (array)
    const existingData = JSON.parse(localStorage.getItem('excelData') || '[]');

    // Combine old + new
    const combined = [...existingData, ...newEntries];

    localStorage.setItem('excelData', JSON.stringify(combined));
    localStorage.setItem('sm', this.selectedMethod);
  };

  reader.readAsBinaryString(target.files[0]);
}

  onsubmit(){
    alert("Excel data addedd successfully")
   this.router.navigate(['/View'])
  }

  back(){
    this.location.back();
  }
   addEntry(form: any) {
  if (form.valid) {
    let excelData = JSON.parse(localStorage.getItem('excelData') || '[]'); // ← array

    const newEntry = {
      ward: this.filters.ward,
      lbody: this.filters.lbody,
      name: this.filters.name,
      gname: this.filters.gname,
      gage: this.filters.gage,
      station: this.filters.station,
      idno: this.filters.idno,
      hno: this.filters.hno,
      hname: this.filters.hname
    };

    excelData.push(newEntry); // ← append object

    localStorage.setItem('excelData', JSON.stringify(excelData));
    localStorage.setItem('sm', this.selectedMethod);

    this.filters = {
      ward: '',
      lbody: '',
      name: '',
      gname: '',
      gage: '',
      station: '',
      idno: '',
      hno: '',
      hname: ''
    };

    alert("Data added successfully");
  } else {
    console.log('Form is not valid');
  }
}

  clearForm(form: any) {
    form.resetForm();
    this.filters = {
      ward: '',
      lbody: '',
      name: '',
      gname: '',
      gage: '',
      station: '',
      idno: '',
      hno: '',
      hname: ''
    };
  }
}
