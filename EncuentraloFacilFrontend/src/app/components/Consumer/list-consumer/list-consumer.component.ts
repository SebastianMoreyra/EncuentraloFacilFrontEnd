import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Consumer } from 'src/app/models/Consumer';
import { ApiService } from 'src/app/services/auth-services/api.service';
import { ConsumerService } from 'src/app/services/consumer.service';

@Component({
  selector: 'app-list-consumer',
  templateUrl: './list-consumer.component.html',
  styleUrls: ['./list-consumer.component.css']
})
export class ListConsumerComponent {
  [x: string]: any;

  userRoles: string = "";

  displayedColumns: string[] = ['id', 'name']

  dataSource = new MatTableDataSource<Consumer>()

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator

  constructor(
    private consumerService: ConsumerService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiService
    ) {}

  ngOnInit(): void {
    this.getConsumer()
    this.userRoles = this.apiService.getUserRoles();
    console.log('User Roles:', this.userRoles);
  }
  getConsumer(){
    this.consumerService.getConsumer().subscribe((data: Consumer[]) =>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator
    })
  }

  filterConsumerbyName(name: any){
    if(name.length === 0)
      {return this.getConsumer()}
      this.consumerService.getConsumer().subscribe((resp: any) =>{
        this.processProductResponse(resp,name)
      })
  }

  processProductResponse(resp: any, name: string) {
    const datProduct: Consumer[] = []

    let listConsumer = resp
    console.log("resp..."+resp)

    listConsumer.forEach((element: Consumer) => {
      if (element.name.startsWith(name))
      {datProduct.push(element)}
    });
    this.dataSource = new MatTableDataSource<Consumer>(datProduct);
    this.dataSource.paginator = this.paginator;
  }

  // edit(
  //   id: number,
  //   brand: string,
  //   category: string,
  //   price: number,
  //   expiration_date: string
  // ){
  //   console.log('Editando ...')
  // }

//   delete(
//     id: number
//     ) {
//       this.productService.deleteProduct(id).subscribe({
//       next: (data) => {
//         console.log("eliminando registro..." + id)
//         this.snackBar.open('Producto eliminado correctamente','',{
//           duration: 3000
//        })
//       this.getProducts()
//       this.router.navigate(['/list'])
//     },
//     error: (err) => {
//       console.log(err)
//     },
//   })
// }
// showDialog(id:number): void {
//   this.dialog
//     .open(DialogComponent, {
//       data: "¿Deseas eliminar?"
//     })
//     .afterClosed()
//     .subscribe((confirmado: Boolean) => {
//       if (confirmado) {
//         this.delete(id)
//       }
//     })
// }

}



