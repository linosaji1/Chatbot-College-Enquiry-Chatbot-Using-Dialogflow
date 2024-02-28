import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path:'',
        redirectTo:'login',
        pathMatch: 'prefix'
      }
    ],
  },
  {
    path:'',
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
