import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { ErrorPopupComponent } from './error-popup/error-popup.component';
import { provideHttpClient} from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [
    
  ],
  
  imports: [
    ModalComponent,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    RouterModule,
    ErrorPopupComponent,
    LoginComponent,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })

  ],
  providers: [provideHttpClient()],
  //bootstrap: [AppComponent]
})
export class AppModule { }