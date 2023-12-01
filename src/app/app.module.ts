import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/user/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { StaffHomeComponent } from './component/staff/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { CarViewComponent } from './component/user/car-view/car-view.component';
import { ViewReservationsComponent } from './component/user/view-reservations/view-reservations.component';
import { ViewCarsComponent } from './component/admin/view-cars/view-cars.component';
import { ViewStaffComponent } from './component/admin/view-staff/view-staff.component';
import { ViewMaintenanceComponent } from './component/admin/view-maintenance/view-maintenance.component';
import { ProfileComponent } from './component/user/profile/profile.component';


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    StaffHomeComponent,
    CarViewComponent,
    ViewReservationsComponent,
    ViewCarsComponent,
    ViewStaffComponent,
    ViewMaintenanceComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
