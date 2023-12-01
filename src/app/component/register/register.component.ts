import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}
  error: String = '';

  password: string = '';
  confirmPassword: string = '';

  onSubmit(registerForm: NgForm): void {
    let formValue: Register = registerForm.value;
    console.log(formValue);

    this.registerService.register(formValue).subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        registerForm.resetForm();
        this.router.navigate(['/login']);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
