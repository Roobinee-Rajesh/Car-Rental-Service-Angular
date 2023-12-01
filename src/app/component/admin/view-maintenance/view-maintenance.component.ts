import { Component } from '@angular/core';
import { Maintenance } from 'src/app/model/maintenance';
import { AdminMaintenanceService } from 'src/app/service/admin/admin-maintenance-service.service';

@Component({
  selector: 'app-view-maintenance',
  templateUrl: './view-maintenance.component.html',
  styleUrls: ['./view-maintenance.component.css'],
})
export class ViewMaintenanceComponent {
  maintenance: Maintenance[] = [];
  constructor(private adminMaintenanceService: AdminMaintenanceService) {
    adminMaintenanceService.getAllMaintenance().subscribe({
      next: (response: any) => {
        this.maintenance = response.data;
        console.log(this.maintenance);
      },
      complete: () => {},
      error: (error: Error) => {
        console.log('Message:', error.message);
        console.log('Name:', error.name);
      },
    });
  }
}
