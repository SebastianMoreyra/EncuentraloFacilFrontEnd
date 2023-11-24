import { Component } from '@angular/core';
import { ItemCarrito } from 'src/app/models/ItemCarrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  listaItemsCarrito: ItemCarrito[] | undefined;

  ngOnInit(): void{
    let carritoStorage = localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);
    this.listaItemsCarrito = carrito
  }

  vaciarCarrito(){
    localStorage.removeItem("carrito");
    //localStorage.clear("carrito");
    this.listaItemsCarrito = [];
  }
}
