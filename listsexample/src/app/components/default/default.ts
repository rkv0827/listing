import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  standalone: false,
  templateUrl: './default.html',
  styleUrl: './default.css'
})
export class Default {
constructor(private router:Router){}
registers(){
 this.router.navigate(['/Register']);
}

logins(){
 this.router.navigate(['/Login']);
}
}
