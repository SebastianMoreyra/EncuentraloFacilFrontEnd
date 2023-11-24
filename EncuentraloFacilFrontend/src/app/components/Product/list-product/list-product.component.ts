import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ApiService } from 'src/app/services/auth-services/api.service';
import { ItemCarrito } from 'src/app/models/ItemCarrito';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  [x: string]: any;

  userRoles: string = "";

  displayedColumns: string[] = ['id', 'brand','category', 'price','expiration_date', 'actions']

  dataSource = new MatTableDataSource<Product>()

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService
    ) {}

  ngOnInit(): void {
    this.getProducts()
    this.userRoles = this.apiService.getUserRoles();
    console.log('User Roles:', this.userRoles);
  }
  getProducts(){
    this.productService.getProducts().subscribe((data: Product[]) =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  filterProductbyCategory(category: any){
    if(category.length === 0)
      {return this.getProducts()}
      this.productService.getProducts().subscribe((resp: any) =>{
        this.processProductResponse(resp,category)
      })
  }

  processProductResponse(resp: any, category: string) {
    const datProduct: Product[] = []

    let listProduct = resp
    console.log("resp..."+resp)

    listProduct.forEach((element: Product) => {
      if (element.category.startsWith(category))
      {datProduct.push(element)}
    });
    this.dataSource = new MatTableDataSource<Product>(datProduct);
    this.dataSource.paginator = this.paginator;
  }

  delete(
    id: number
    ) {
      this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        console.log("eliminando registro..." + id)
        this.snackBar.open('Producto eliminado correctamente','',{
          duration: 3000
       })
      this.getProducts()
      this.router.navigate(['/list'])
    },
    error: (err) => {
      console.log(err)
    },
  })
}
showDialog(id:number): void {
  this.dialog
    .open(DialogComponent, {
      data: "¿Deseas eliminar?"
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.delete(id)
      }
    })
}

getProductById(id:number){
  this.productService.getProductosById(id);
}

agregarCarrito(item: Product){
  console.log(item)
  this.snackBar.open('Producto añadido al carrito correctamente', '', {
    duration: 3000
  })
  let iCarrito: ItemCarrito = {
    id:item.id,
    category: item.category,
    brand: item.brand,
    price: item.price,
    expiration_date: item.expiration_date,
    quantity: 1
  }
  if(localStorage.getItem("carrito") === null) {
    let carrito: ItemCarrito[] = [];
    carrito.push(iCarrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  else{
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    let index = -1;
    for(let i = 0; i<carrito.length; i++){
      let itemC: ItemCarrito = carrito[i];
      if(iCarrito.brand === itemC.brand){
        index = i;
        break;
      }
    }
    if(index === -1){
      carrito.push(iCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    else {
      let itemCarrito: ItemCarrito = carrito[index];
      itemCarrito.quantity!++;
      carrito[index] = itemCarrito;
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }


  }


}

}


