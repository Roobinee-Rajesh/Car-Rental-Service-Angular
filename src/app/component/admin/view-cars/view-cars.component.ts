import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Car } from 'src/app/model/car';
import { Staff } from 'src/app/model/staff';
import { AdminCarService } from 'src/app/service/admin/admin-car.service';
import { AdminStaffService } from 'src/app/service/admin/admin-staff.service';

@Component({
  selector: 'app-view-cars',
  templateUrl: './view-cars.component.html',
  styleUrls: ['./view-cars.component.css'],
})
export class ViewCarsComponent implements OnInit {
  cars: Car[] = [];
  editId: number = 0;
  file = '';
  editCarObject: Car = {
    id: 0,
    manufacturer: '',
    model: '',
    year: 0,
    photo: '',
    seats: 0,
    rental_pricing: 0,
    maintenance_schedule: 0,
    maintenance_staff_id: 0,
    maintenance_staff: '',
  };

  buttonName: string = 'Add';
  staffOptions: Staff[] = [];
  constructor(
    private adminCarService: AdminCarService,
    private adminStaffService: AdminStaffService
  ) {}

  ngOnInit(): void {
    this.adminCarService.getAllCar().subscribe({
      next: (response: AppResponse) => {
        this.cars = response.data;
        console.log(this.cars);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.adminStaffService.getAllStaff().subscribe({
      next: (response: AppResponse) => {
        this.staffOptions = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  deleteCar(deleteId: number | undefined) {
    if (deleteId != undefined) {
      console.log(deleteId);

      this.adminCarService.deleteCarById(deleteId).subscribe({
        next: (response: any) => {
          this.ngOnInit();
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    }
  }

  editCar(car: Car) {
    console.log(car);

    this.editCarObject.id = car.id;
    this.editCarObject.maintenance_schedule = car.maintenance_schedule;
    this.editCarObject.manufacturer = car.manufacturer;
    this.editCarObject.model = car.model;
    this.editCarObject.year = car.year;
    this.editCarObject.seats = car.seats;
    // this.editCarObject.photo = car.photo;
    this.editCarObject.rental_pricing = car.rental_pricing;
    this.editCarObject.maintenance_staff_id = car.maintenance_staff_id;
    this.editCarObject.maintenance_staff = car.maintenance_staff;

    this.buttonName = 'Edit';
    // console.log(car);
    // console.log(this.editCarObject);
  }

  onSubmit(addCarForm: NgForm): void {
    let formValue: Car = addCarForm.value;
    console.log(formValue);
    console.log(this.editCarObject.id);
    const formData = new FormData();
    formData.append('id', formValue.id!.toString());
    formData.append('photo', this.file);
    formData.append('manufacturer', formValue.manufacturer);
    formData.append('model', formValue.model);
    formData.append('year', formValue.year.toString());
    formData.append('seats', formValue.seats.toString());
    formData.append('rental_pricing', formValue.rental_pricing.toString());
    formData.append(
      'maintenance_schedule',
      formValue.maintenance_schedule.toString()
    );
    formData.append(
      'maintenance_staff_id',
      formValue.maintenance_staff_id.toString()
    );

    if (this.editCarObject.id === 0) {
      this.adminCarService.addcar(formData).subscribe({
        next: (response: AppResponse) => {
          console.log('Response:', response);
          addCarForm.resetForm();
          this.ngOnInit();
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    } else {
      console.log(formData);
      console.log(formValue.id);

      this.adminCarService.editCar(formValue).subscribe({
        next: (response: AppResponse) => {
          console.log('Response:', response);
          addCarForm.resetForm();
          this.editCarObject.maintenance_schedule = 0;
          this.editCarObject.manufacturer = '';
          this.editCarObject.model = '';
          this.editCarObject.photo = '';
          this.editCarObject.year = 0;
          this.editCarObject.seats = 0;
          this.editCarObject.rental_pricing = 0;
          this.editCarObject.maintenance_staff_id = 0;
          this.editCarObject.id = 0;
          this.buttonName = 'Add';
          this.ngOnInit();
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    }
  }

  addReset() {
    this.editCarObject.maintenance_schedule = 0;
    this.editCarObject.manufacturer = '';
    this.editCarObject.model = '';
    this.editCarObject.year = 0;
    this.editCarObject.seats = 0;
    this.editCarObject.rental_pricing = 0;
    this.editCarObject.maintenance_staff_id = 0;
    this.buttonName = 'Add';
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];

      // console.log('Selected file',this.file);
    }
  }
}
