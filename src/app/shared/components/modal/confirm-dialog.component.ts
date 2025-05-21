import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-confirm-dialog',
  styleUrls: ['./confirm-dialog.component.css'],
  template: `
    <h1 class="modal-title" mat-dialog-title>Confirm deletion</h1>
    <mat-dialog-content class="modal-description">
      Are you sure you want to delete?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button class="modal-button" (click)="onConfirm()">Confirm</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}