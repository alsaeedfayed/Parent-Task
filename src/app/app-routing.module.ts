import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticationGuard } from './core/guards/not-authenticated/not-authenticated.guard';
import { authenticatedGuard } from './core/guards/authenticated/authenticated.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    canActivate : [UnauthenticationGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    canActivate : [UnauthenticationGuard],
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)

  },
  {
    path: 'users',
    canActivate : [authenticatedGuard],
    loadChildren: () => import('./modules/list-users/list-users.module').then(m => m.ListUsersModule),

  },

  {
    path: 'user/:id',
    canActivate : [authenticatedGuard],
    loadChildren: () => import('./modules/user-details/user-details.module').then(m => m.UserDetailsModule),

  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
