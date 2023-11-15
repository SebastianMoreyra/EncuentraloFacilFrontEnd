import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/Product/list-product/list-product.component';
import { AddProductComponent } from './components/Product/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path: 'list', component: ListProductComponent,canActivate:[AuthGuard]},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'editProduct/:id', component: AddProductComponent},
  {path: 'auth/login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
