import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr';
import { ToastOptions } from 'ng2-toastr';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { HomeModule }         from './home/home.module';
import { LoginRoutingModule }   from './login-routing.module';
import { LoginComponent }       from './account/login.component';
import { RegisterComponent }       from './account/register.component';
import { ForgotPasswordComponent } from './account/ForgotPassword.component';
import { EditProfileComponent }    from './account/EditProfile.component';
import { ChangePasswordComponent }    from './account/ChangePassword.component';
import { ResetPasswordComponent } from './account/ResetPassword.component';

import { ApiService } from './shared';
import { AuthService} from './auth.service';
import { AdminModule }         from './admin/admin.module';
import { DialogService }        from './dialog.service';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { CategoriesModule } from './Categories/Categories.module';
import { ProductsModule } from './Products/Products.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ToastModule,
    HomeModule,
    AdminModule,
    LoginRoutingModule,
		CategoriesModule,
		ProductsModule,

    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EditProfileComponent,
		ChangePasswordComponent,
		ResetPasswordComponent
  ],
  providers: [
    ApiService,
    AuthService,
    DialogService,
    ToastsManager,
    ToastOptions
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
