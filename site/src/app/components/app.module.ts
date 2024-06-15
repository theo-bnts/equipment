import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import AppComponent from './app.component';
import routes from './app.routes';
import HeaderComponent from './partials/header/header.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    HeaderComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule {}
