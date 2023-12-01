import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Reservation } from 'src/app/model/reservation';
import { UserReservationService } from 'src/app/service/user/user-reservation.service';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css'],
})
export class ViewReservationsComponent implements OnInit {
  futureReservations: Reservation[] = [];
  currentReservation: Reservation[] = [];
  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };

  constructor(
    private userReservationService: UserReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userReservationService.getAllFutureReservation().subscribe({
      next: (response: any) => {
        this.futureReservations = response.data;
        console.log(this.futureReservations);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });

    this.userReservationService.getCurrentReservation().subscribe({
      next: (response: any) => {
        this.currentReservation = response.data;
        console.log(this.currentReservation);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  cancelReservation(reservationId: number) {
    this.userReservationService.cancelReservationById(reservationId).subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.ngOnInit();
        // this.router.navigate(['/cars']);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
