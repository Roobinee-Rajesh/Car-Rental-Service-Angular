import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { Register } from 'src/app/model/register';
import { Reservation } from 'src/app/model/reservation';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UserReservationService } from 'src/app/service/user/user-reservation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };

  error: String = '';
  id: number = 0;
  userName: String = '';
  name: String = '';
  email: string = '';
  phoneNumber: string = '';
  password: String = '';
  address: string = '';
  pastReservations: Reservation[] = [];

  // Boolean variable to track edit mode
  isEditMode: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private userReservationService: UserReservationService
  ) {}

  ngOnInit(): void {
    // Fetch data from local storage
    let loggedInUser: AppUser = this.storageService.getLoggedInUser();
    console.log(loggedInUser);

    // Check if data exists before assigning
    if (loggedInUser) {
      this.id = loggedInUser.id;
      this.userName = loggedInUser.username;
      this.name = loggedInUser.name;
      this.email = loggedInUser.email;
      this.phoneNumber = loggedInUser.phone_number;
      this.address = loggedInUser.address;
      this.password = loggedInUser.password;
    }

    this.userReservationService.getAllPastReservation().subscribe({
      next: (response: any) => {
        this.pastReservations = response.data;
        console.log(this.pastReservations);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  // Function to toggle edit mode
  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  onSubmit(profileForm: NgForm): void {
    console.log(profileForm.value);

    this.authService.editUser(profileForm.value).subscribe({
      next: (response: AppResponse) => {
        console.log('Response:', response);
        this.id = response.data.id;
        this.userName = response.data.username;
        this.name = response.data.name;
        this.email = response.data.email;
        this.phoneNumber = response.data.phone_number;
        this.address = response.data.address;
        this.password = response.data.password;
        this.storageService.setLoggedInUser(response.data);
        this.isEditMode = false;
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
