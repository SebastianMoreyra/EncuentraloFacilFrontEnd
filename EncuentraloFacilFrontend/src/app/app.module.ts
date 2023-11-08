import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListSellerComponent } from './components/Seller/list-seller/list-seller.component';
import { AddSellerComponent } from './components/Seller/add-seller/add-seller.component';
import { ListProductComponent } from './components/Product/list-product/list-product.component';
import { AddProductComponent } from './components/Product/add-product/add-product.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';
import { AddConsumerComponent } from './components/Consumer/add-consumer/add-consumer.component';
import { MaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListSellerComponent,
    AddSellerComponent,
    ListProductComponent,
    AddProductComponent,
    AddUserComponent,
    AddConsumerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
