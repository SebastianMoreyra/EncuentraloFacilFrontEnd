import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  public myForm!: FormGroup
  //public _tax: number = 0
  public _id: number = 0
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reactiveForm()
  }

  reactiveForm() {
    this.myForm = this.fb.group ({
      id: [''],
      brand: ['', Validators.required],
      price:  ['', Validators.required],
      category:  ['', Validators.required],
      expiration_date: ['', Validators.required]

    })

    this._id = this.activatedRoute.snapshot.params['id']

    if (this._id != 0 && this._id != undefined) {
      this.productService.getProductosById(this._id).subscribe((data: Product) =>{
        this.myForm.get('price')!.setValue(data.price)
        this.myForm.get('brand')!.setValue(data.brand)
        this.myForm.get('category')!.setValue(data.category)
        this.myForm.get('expiration_date')!.setValue(data.expiration_date)
      } )
    }
  }

  addProduct() {
    //this._tax = this.myForm.get('price')!.value * 0.18

    const product: Product = {
      id: 0,
      price: this.myForm.get('price')!.value,
      brand: this.myForm.get('brand')!.value,
      category: this.myForm.get('category')!.value,
      expiration_date: this.myForm.get('expiration_date')!.value,
    }
    if (this._id == 0 || this._id == undefined) {
      this.productService.saveProduct(product).subscribe({
        next: (data) => {
          console.log("ingresando registro...")
          this.snackBar.open('Producto creado correctamente', '', {
            duration: 3000
          })
          this.router.navigate(['/list'])
        },
        error: (err) => {
          console.log(err)
        },
      })
    } else
    {
      this.productService.updateProduct(product, this._id).subscribe({
        next: (date) => {
          this.snackBar.open('Producto modificado correctamente', '', {
            duration: 3000
          })
        },
        error: (err) => {
          console.log(err)
        }
      })
    }

  }

}
