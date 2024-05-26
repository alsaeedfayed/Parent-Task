import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)

  },
  {
    path: 'users',
    loadChildren: () => import('./modules/list-users/list-users.module').then(m => m.ListUsersModule),

  },

  {
    path: 'user/:id',
    loadChildren: () => import('./modules/user-details/user-details.module').then(m => m.UserDetailsModule),

  },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
