import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListListComponent } from './components/list/list-list/list-list.component';
import { ListProyectColabComponent } from './components/proyect/list-proyect-colab/list-proyect-colab.component';
import { ListProyectComponent } from './components/proyect/list-proyect/list-proyect.component';
import { ListTaskComponent } from './components/task/list-task/list-task.component';
import { LayoutComponent } from './home/dashboard/layout/layout.component';
import { HomeComponent } from './home/dashboard/home/home.component';
import { LoginComponent } from './home/login/login.component';
import { LandingComponent } from './home/landing/landing/landing.component';
import { RegisterComponent } from './home/register/register.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';

import { AuthGuard } from './guard/auth.guard';
import { UpdateProyectComponent } from './components/proyect/update-proyect/update-proyect.component';
import { AddColaboratorComponent } from './components/proyect/add-colaborator/add-colaborator.component';
import { SaveTaskComponent } from './components/task/save-task/save-task.component';
const routes: Routes = [
  { path: '', component: LandingComponent,
  pathMatch: 'full',},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'listProyect',
        component: ListProyectComponent,
        canActivate: [AuthGuard],
      },
      {
            path: 'listProyect/addColaborator/:_id',
            component:  AddColaboratorComponent,
            canActivate: [AuthGuard],
      },
      {
        path: 'listProyectColab',
        component: ListProyectColabComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'listProyect/listList/:_id',
        component: ListListComponent
      },
      {
        path: 'listProyectColab/listList/:_id',
        component: ListListComponent
      },
      {
        path: 'listProyect/listList/:_id/saveTask',
        component: SaveTaskComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'updateUser',
        component: UpdateUserComponent,
        canActivate: [AuthGuard],
        
      },
    ],
  },
  { path: '**', component: LandingComponent,
  pathMatch: 'full',
  canActivate: [AuthGuard],
},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
