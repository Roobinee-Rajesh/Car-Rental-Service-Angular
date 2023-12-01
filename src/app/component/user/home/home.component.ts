import { Component } from '@angular/core';
import { AbstractControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Car } from 'src/app/model/car';
import { SearchRange } from 'src/app/model/searchRange';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserFindCarService } from 'src/app/service/user/user-find-car.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from 'src/app/model/register';
import { AppUser } from 'src/app/model/appUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  showResults: boolean = false;
  searchResults: Car[] = [];
  form: FormGroup;
  defaultPickupDate: string = '';

  constructor(
    private router: Router,
    private userFindCarService: UserFindCarService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
    this.defaultPickupDate = this.getCurrentDate();

    // Subscribe to changes in the pickup date control
    this.form.get('start_date')!.valueChanges.subscribe((value) => {
      // Enable or disable the drop date control based on the pickup date value
      const dropDateControl = this.form.get('end_date');
      if (value) {
        dropDateControl!.enable();
        dropDateControl!.setValidators([
          Validators.required,
          this.validateDropDate.bind(this),
        ]);
      } else {
        dropDateControl!.disable();
        dropDateControl!.clearValidators();
      }
      dropDateControl!.updateValueAndValidity();
    });
  }

  // Custom validator function for drop date
  validateDropDate(control: AbstractControl) {
    const pickupDate = new Date(this.form.get('start_date')!.value);
    const dropDate = new Date(control.value);

    if (pickupDate && dropDate && dropDate <= pickupDate) {
      return { invalidDropDate: true };
    }

    return null;
  }

  getCurrentDate(): string {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${today.getFullYear()}-${month}-${day}`;
  }

  onFormSubmit(): void {
    if (this.form.valid) {
      const formValue: SearchRange = this.form.value;
      const formValueString = JSON.stringify(formValue);
      this.storageService.setFromToDate(formValueString);

      this.userFindCarService.findCars(formValue).subscribe({
        next: (response: AppResponse) => {
          this.searchResults = response.data;
          console.log('Response:', response.data);
          this.showResults = true;
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    }
  }

  loggedInUser(): boolean {
    return this.authService.isLoggedIn();
    // const isLoggedIn = this.storageService.getLoggedInUser() != null;
    // console.log('Is logged in:', isLoggedIn);
    // return isLoggedIn;
  }

  scroll(direction: 'left' | 'right'): void {
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
      const scrollAmount = 300; // adjust as needed
      if (direction === 'left') {
        scrollContainer.scrollLeft -= scrollAmount;
      } else {
        scrollContainer.scrollLeft += scrollAmount;
      }
    }
  }
}
