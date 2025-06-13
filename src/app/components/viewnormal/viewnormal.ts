import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-viewnormal',
  standalone: false,
  templateUrl: './viewnormal.html',
  styleUrl: './viewnormal.css'
})
export class Viewnormal {
  constructor(private router:Router){}
  excelData: any[] = [];
   ngOnInit() {
    const data = localStorage.getItem('excelData');
    if (data) {
      const parsedData = JSON.parse(data);

      // Convert columns to rows for displaying in a table
      const rowCount = parsedData["wards"].length;
      for (let i = 0; i < rowCount; i++) {
        this.excelData.push({
          ward: parsedData["wards"][i],
          lbody: parsedData["lbodys"][i],
          name: parsedData["Name"][i],
          gname: parsedData["Guardian Name"][i],
          gage: parsedData["Gender / Age"][i],
          station: parsedData["stations"][i],
          idno: parsedData["ID Card No."][i],
          hno: parsedData["New House No."][i],
          hname: parsedData["House Name"][i]
        });
      }
    }
  }

  viewDetails(row: any) {
  alert("hello user")
}
}
