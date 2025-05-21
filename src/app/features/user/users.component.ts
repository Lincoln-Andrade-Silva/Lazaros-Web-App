import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { GenericTableComponent } from '../../shared/components/table/generic-table.component';
import { UserResponse } from '../../shared/model/user/UserResponse';
import { HttpClientModule } from '@angular/common/http';
import { UserModalComponent } from '../../shared/components/modal/user/user-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  imports: [GenericTableComponent, HttpClientModule]
})
export class UsersComponent implements OnInit {
  entityList = {
    data: [] as UserResponse[],
    totalPages: 0,
    totalElements: 0,
  };

  columns = ['ID', 'Name', 'Profiles'];

  constructor(private dialog: MatDialog, public userService: UserService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.list().subscribe({
      next: (response) => {
        this.entityList = response;
      },
      error: (err) => {
        console.error('Erro ao carregar usuários', err);
      }
    });
  }
  
  openCreateModal() {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openEditModal(user: UserResponse) {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '400px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  handleDelete(id: any) {
    this.userService.delete(id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        console.error('Erro ao excluir usuário', err);
      }
    });
  }
}