import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard }          from './auth-guard.service';
import { PreloadSelectedModules } from './selective-preload-strategy';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about.component';
import { ContactComponent } from './home/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  {
    path: 'admin',
		loadChildren: './admin/admin.module#AdminModule',
    canLoad: [AuthGuard]
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

//export const routing = RouterModule.forRoot(routes);
@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadSelectedModules }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    PreloadSelectedModules
  ]
})
export class AppRoutingModule {}
