import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/Product/list-product/list-product.component';
import { AddProductComponent } from './components/Product/add-product/add-product.component';

const routes: Routes = [
  {path: 'list', component: ListProductComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'editProduct/:id', component: AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
