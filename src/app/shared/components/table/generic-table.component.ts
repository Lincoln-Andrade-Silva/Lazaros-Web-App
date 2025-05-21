import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, SimpleChanges, TemplateRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DataListResponse } from '../../model/DataListResponse';
import { ConfirmDialogComponent } from '../modal/confirm-dialog.component';
import { CellContentComponent } from './cell-content.component';
import { TableHeaderComponent } from './table-header.component';

@Component({
    standalone: true,
    selector: 'app-generic-table',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.css'],
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        CellContentComponent,
        TableHeaderComponent,
        MatDialogModule
    ]
})
export class GenericTableComponent<T> {

    constructor(private dialog: MatDialog) { }
    
    @Input() columns: string[] = [];
    @Input() entityName!: string;
    @Input() entityList: DataListResponse<T> | null = null;

    @Output() edit = new EventEmitter<T>();
    @Output() delete = new EventEmitter<any>();
    @Output() addClick = new EventEmitter<void>();

    @ContentChild('cellTemplate') cellTemplate?: TemplateRef<any>;

    displayedColumns: string[] = [];
    dataSource = new MatTableDataSource<T>([]);

    ngOnChanges(changes: SimpleChanges) {
        if (changes['columns'] || changes['entityList']) {
            this.displayedColumns = ['spacer', ...this.columns, 'actions'];
            this.dataSource.data = this.entityList?.data || [];
        }
    }

    onDelete(item: any): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, { width: '400px', });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.delete.emit(item.id);
            }
        });
    }
}