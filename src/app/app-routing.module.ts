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
   // canActivate : [authenticatedGuard],
    loadChildren: () => import('./modules/list-users/list-users.module').then(m => m.ListUsersModule),

  },

  {
    path: 'user/:id',
    canActivate : [authenticatedGuard],
    loadChildren: () => import('./modules/user-details/user-details.module').then(m => m.UserDetailsModule),

  },

  {
    path : 'dashboard',
    //canActivate : [authenticatedGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },

  {
    path : 'not-authenticated',
    loadComponent: () => import('./stand-alone-components/not-autherized/not-autherized.component').then(m => m.NotAutherizedComponent)
  },

  {
    path : 'not-found',
    loadComponent: () => import('./stand-alone-components/not-found/not-found.component').then(m => m.NotFoundComponent)
  },

  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
