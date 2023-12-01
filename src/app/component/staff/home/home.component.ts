// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AnimationOptions } from 'ngx-lottie';
// import { AppResponse } from 'src/app/model/appResponse';
// import { Maintenance } from 'src/app/model/maintenance';
// import { StaffMaintenanceService } from 'src/app/service/staff/staff-maintenance-service.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
// export class StaffHomeComponent implements OnInit {
//   empty: AnimationOptions = {
//     path: '/assets/empty.json',
//   };
//   maintenance: Maintenance[] = [];
//   maintenanceStatusList: { label: string; value: string }[] = [];
//   maintenanceStatus:string='';

//   constructor(private staffMaintenanceService: StaffMaintenanceService, private router:Router) {
//     this.maintenanceStatus="1";
//   }

//   ngOnInit(): void {
//     this.maintenanceStatusList = [
//       { label: 'Pending', value: '1' },
//       { label: 'Maintenance Done', value: '2' },
//     ];
//     this.staffMaintenanceService.getAllStaffMaintenance().subscribe({
//       next: (response: any) => {
//         this.maintenance = response.data;
//         console.log(this.maintenance);
//       },
//       complete: () => {},
//       error: (error: Error) => {
//         console.log('Message:', error.message);
//         console.log('Name:', error.name);
//       },
//     });
//   }

//   onStatusChange(maintenanceItem: Maintenance) {

//     // maintenanceItem.maintenanceStatus="2";
//     console.log(maintenanceItem);

//     this.staffMaintenanceService.updateMaintenance(maintenanceItem).subscribe({
//       next: (response: AppResponse) => {
//         console.log('Response:', response);
//         this.ngOnInit();
//       },
//       complete: () => {},
//       error: (error: Error) => {
//         console.log('Message:', error.message);
//         console.log('Name:', error.name);
//       },
//     });

//   }
// }

// staff-home.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppResponse } from 'src/app/model/appResponse';
import { Maintenance } from 'src/app/model/maintenance';
import { StaffMaintenanceService } from 'src/app/service/staff/staff-maintenance-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class StaffHomeComponent implements OnInit {
  empty: AnimationOptions = {
    path: '/assets/empty.json',
  };
  maintenance: Maintenance[] = [];
  maintenanceStatusList: { label: string; value: string }[] = [];

  constructor(
    private staffMaintenanceService: StaffMaintenanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.maintenanceStatusList = [
      { label: 'Pending', value: '1' },
      { label: 'Maintenance Done', value: '2' },
    ];
    this.staffMaintenanceService.getAllStaffMaintenance().subscribe({
      next: (response: any) => {
        this.maintenance = response.data;
        this.maintenance.forEach((item) => (item.maintenanceStatus = '1'));
        console.log(this.maintenance);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }

  onStatusChange(maintenanceItem: Maintenance) {
    this.staffMaintenanceService.updateMaintenance(maintenanceItem).subscribe({
      next: (response: AppResponse) => {
        console.log('Response:', response);
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
