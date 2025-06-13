import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  form:FormGroup;
  showPassword: boolean = false;
  constructor(private router:Router,private location:Location,private fb:FormBuilder){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
   get passwordMismatch() {
    return (
      this.form.get('password')?.value !== this.form.get('confirmPassword')?.value
    );
  }
  onsubmit() {
    if (this.form.valid && !this.passwordMismatch) {
      localStorage.setItem('registerdetails', JSON.stringify(this.form.value));

      this.onLogin();
    } else {
      this.form.markAllAsTouched();
    }
  }

onclear() {
    this.form.reset();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

onLogin() {
  alert("Register successfully...")
  this.router.navigate(['/Login']);
}

back(){
  this.location.back();
}

}
