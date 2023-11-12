import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  [x: string]: any;

  displayedColumns: string[] = ['id', 'brand','category', 'price','expiration_date', 'actions']

  dataSource = new MatTableDataSource<Product>()

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProducts()
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

  edit(
    id: number,
    brand: string,
    category: string,
    price: number,
    expiration_date: string
  ){
    console.log('Editando ...')
  }

  delete(
    id: any
    ) {
      this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        console.log("eliminando registro..." + id)
        this.snackBar.open('Producto eliminado correctamente','',{
          duration: 3000
       })
      this.getProducts()
      this.router.navigate(['/api/product/list'])
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

}


