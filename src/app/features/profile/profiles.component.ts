import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profile/profile.service';
import { GenericTableComponent } from '../../shared/components/table/generic-table.component';
import { ProfileResponse } from '../../shared/model/profile/ProfileResponse';
import { HttpClientModule } from '@angular/common/http'
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalComponent } from '../../shared/components/modal/profile/profile-modal.component';

@Component({
  standalone: true,
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  imports: [GenericTableComponent, HttpClientModule]
})
export class ProfilesComponent implements OnInit {
  entityList = {
    data: [] as ProfileResponse[],
    totalPages: 0,
    totalElements: 0
  };

  columns = ['ID', 'Description'];

  constructor(private dialog: MatDialog, private profileService: ProfileService) { }

  ngOnInit() {
    this.loadProfiles();
  }

  loadProfiles() {
    this.profileService.list().subscribe({
      next: (response) => {
        this.entityList = response;
      },
      error: (err) => {
        console.error('Erro ao carregar perfis', err);
      }
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProfiles();
      }
    });
  }

  openEditModal(profile: ProfileResponse) {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      width: '400px',
      data: { profile: profile }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProfiles();
      }
    });
  }

  handleDelete(id: any) {
    this.profileService.delete(id).subscribe({
      next: () => {
        this.loadProfiles();
      },
      error: (err) => {
        console.error('Erro ao excluir perfil', err);
      }
    });
  }
}
