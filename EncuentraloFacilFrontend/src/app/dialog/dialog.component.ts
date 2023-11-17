import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  constructor (
    private router: Router,
    public dialogo: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string)
    {
    }
    cerrarDialogo(): void {
      this.dialogo.close(false)
      //this.router.navigate(['/list'])
    }
    confirmado(): void {
      this.dialogo.close(true)
      //this.router.navigate(['/list'])
    }
    ngOnInit() {}

}
