import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
   form: FormGroup;
  constructor(private router:Router,private location:Location,private fb:FormBuilder){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

onclear(){
  this.form.reset();
}
showPassword: boolean = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

onLogin() {
  if (this.form.valid) {
      const reg=localStorage.getItem('registerdetails');
      if(reg)
      {
        const regparsed=JSON.parse(reg);
        if(regparsed.username!==this.form.get('username')?.value||regparsed.password!==this.form.get('password')?.value){
          alert("Invalid Credentials");
          alert("please register first...");
          this.router.navigate(['Register'])
        }
        else{
          alert("Hi welcome "+this.form.get('username')?.value)
          localStorage.setItem('logindetails',JSON.stringify(this.form.value));
          this.router.navigate(['/View']);
        }
      }
      else{
        alert("please register first...");
        this.router.navigate(['Register'])
      }
    } else {
      this.form.markAllAsTouched();
    }
}
back(){
  this.router.navigate(['/']);
}


}
