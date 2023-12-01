import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Car } from 'src/app/model/car';
import { Reservation } from 'src/app/model/reservation';
import { Staff } from 'src/app/model/staff';
import { AdminCarService } from 'src/app/service/admin/admin-car.service';
import { AdminReservationService } from 'src/app/service/admin/admin-reservation.service';
import { AdminStaffService } from 'src/app/service/admin/admin-staff.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit {
  // car: AnimationOptions = {
  //   path: '/assets/adminHomeCar.json',
  // };
  // staff: AnimationOptions = {
  //   path: '/assets/adminHomeStaff.json',
  // };

  staff: Staff[] = [];
  cars: Car[] = [];
  reservation: Reservation[] = [];
  constructor(
    private adminCarService: AdminCarService,
    private adminStaffService: AdminStaffService,
    private adminReservationService: AdminReservationService
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
        this.staff = response.data;
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.adminReservationService.getAllReservation().subscribe({
      next: (response: AppResponse) => {
        this.reservation = response.data;
        console.log(this.reservation);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
