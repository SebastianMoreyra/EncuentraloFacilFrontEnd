import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/Product/list-product/list-product.component';
import { AddProductComponent } from './components/Product/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { ListConsumerComponent } from './components/Consumer/list-consumer/list-consumer.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const routes: Routes = [
  //{path: 'list', component: ListProductComponent},
  {path: 'list', component: ListProductComponent,canActivate:[AuthGuard]},
  //{path: '', component: ListProductComponent,canActivate:[AuthGuard]},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'editProduct/:id', component: AddProductComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'Inicio', component: InicioComponent},
  {path: 'listConsumer', component: ListConsumerComponent,canActivate:[AuthGuard]},
  {path: 'CarritodeCompras', component:CarritoComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
