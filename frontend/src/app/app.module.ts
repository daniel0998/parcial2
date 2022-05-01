import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { SaveProyectComponent } from './components/proyect/save-proyect/save-proyect.component';
import { ListProyectComponent } from './components/proyect/list-proyect/list-proyect.component';
import { UpdateProyectComponent } from './components/proyect/update-proyect/update-proyect.component';
import { SaveListComponent } from './components/list/save-list/save-list.component';
import { UpdateListComponent } from './components/list/update-list/update-list.component';
import { ListListComponent } from './components/list/list-list/list-list.component';
import { SaveTaskComponent } from './components/task/save-task/save-task.component';
import { ListTaskComponent } from './components/task/list-task/list-task.component';
import { UpdateTaskComponent } from './components/task/update-task/update-task.component';
import { SaveUserComponent } from './components/user/save-user/save-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';
import { LandingComponent } from './home/landing/landing/landing.component';
import { LayoutComponent } from './home/dashboard/layout/layout.component';
import { HomeComponent } from './home/dashboard/home/home.component';


import {ListService} from './services/list.service';
import {ProyectsService} from './services/proyects.service';
import {RoleService} from './services/role.service';
import {TaskService} from './services/task.service';
import {UserService} from './services/user.service';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTabsModule} from '@angular/material/tabs'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';

import { ListProyectColabComponent } from './components/proyect/list-proyect-colab/list-proyect-colab.component';

import { AuthGuard } from './guard/auth.guard';
import { AddColaboratorComponent } from './components/proyect/add-colaborator/add-colaborator.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    SaveProyectComponent,
    ListProyectComponent,
    UpdateProyectComponent,
    SaveListComponent,
    UpdateListComponent,
    ListListComponent,
    SaveTaskComponent,
    ListTaskComponent,
    UpdateTaskComponent,
    SaveUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    LandingComponent,
    LayoutComponent,
    ListProyectColabComponent,
    AddColaboratorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: [
    ListService,
    ProyectsService,
    RoleService,
    TaskService,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
