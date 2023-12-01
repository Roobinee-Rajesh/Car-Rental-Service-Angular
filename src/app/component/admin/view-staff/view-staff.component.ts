import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { Register } from 'src/app/model/register';
import { Staff } from 'src/app/model/staff';
import { AdminStaffService } from 'src/app/service/admin/admin-staff.service';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css'],
})
export class ViewStaffComponent implements OnInit {
  staff: Staff[] = [];
  button="Add";
  editStaffObject: Staff = {
    id: 0,
    username: '',
    name: '',
    password: '',
    email: '',
    phone_number: '',
    address: '',
  };
  constructor(
    private adminStaffService: AdminStaffService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.adminStaffService.getAllStaff().subscribe({
      next: (response: AppResponse) => {
        this.staff = response.data;
        console.log(this.staff);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  onSubmit(staffForm: NgForm): void {
    let formValue: Register = staffForm.value;
    console.log(formValue);
    if (this.editStaffObject.id === 0) {
      this.adminStaffService.addStaff(formValue).subscribe({
        next: (response: AppResponse) => {
          console.log('Response:', response);
          staffForm.resetForm();
          this.ngOnInit();
        },
        complete: () => {},
        error: (error: Error) => {
          console.log('Message:', error.message);
          console.log('Name:', error.name);
        },
      });
    } else {
      this.adminStaffService.editStaff(this.editStaffObject).subscribe({
        next: (response: AppResponse) => {
          console.log('Response:', response);
          staffForm.resetForm();
          this.button="Add";
          this.fromReset();
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

  editStaff(staff: Staff) {
    console.log(staff);
    this.editStaffObject.id = staff.id;
    this.editStaffObject.username = staff.username;
    this.editStaffObject.name = staff.name;
    this.editStaffObject.password = staff.password;
    this.editStaffObject.email = staff.email;
    this.editStaffObject.phone_number = staff.phone_number;
    this.editStaffObject.address = staff.address;
    console.log(this.editStaffObject);
    this.button="Edit";
  }

  deleteStaffById(deleteId: number) {
    console.log(deleteId);

    this.adminStaffService.deleteStaffById(deleteId).subscribe({
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

  fromReset() {
    this.editStaffObject.id = 0;
    this.editStaffObject.username = '';
    this.editStaffObject.name = '';
    this.editStaffObject.password = '';
    this.editStaffObject.email = '';
    this.editStaffObject.phone_number = '';
    this.editStaffObject.address = '';
  }
}
