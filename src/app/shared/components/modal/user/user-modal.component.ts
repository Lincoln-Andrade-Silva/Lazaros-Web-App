import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileResponse } from '../../../model/profile/ProfileResponse';
import { UserService } from '../../../../core/services/user/user.service';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { UserResponse } from '../../../model/user/UserResponse';
import { UserRequest } from '../../../model/user/UserRequest';

@Component({
    selector: 'app-user-modal',
    standalone: true,
    templateUrl: './user-modal.component.html',
    styleUrls: ['./user-modal.component.css'],
    imports: [
        CommonModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSelectModule
    ]
})
export class UserModalComponent implements OnInit {
    isLoading = false;
    isEditMode = false;
    profiles: ProfileResponse[] = [];
    userForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private userService: UserService,
        private profileService: ProfileService,
        public dialogRef: MatDialogRef<UserModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { user: UserResponse }
    ) {
        this.userForm = this.fb.group({
            name: ['', Validators.required],
            profileIds: [[], [Validators.required, Validators.minLength(1)]]
        });
    }

    async ngOnInit() {
        this.profileService.list().subscribe({
            next: (response: { data: ProfileResponse[]; }) => {
                this.profiles = response.data;
            },
            error: (err: any) => {
                console.error('Erro ao carregar perfis:', err);
            }
        });

        if (this.data?.user) {
            this.isEditMode = true;
            this.userForm.patchValue({
                name: this.data.user.name,
                profileIds: this.data.user.profiles.map(p => p.id)
            });
        }
    }

    async handleSubmit() {
        if (this.userForm.valid) {
            this.isLoading = true;
            try {
                const userData: UserRequest = this.userForm.value;

                if (this.isEditMode) {
                    await this.userService.edit(this.data.user.id, userData).toPromise();
                } else {
                    await this.userService.create(userData).toPromise();
                }

                this.dialogRef.close(true);
                this.showSuccessMessage();
            } catch (err) {
                this.handleError(err);
            } finally {
                this.isLoading = false;
            }
        }
    }

    private showSuccessMessage() {
        const message = this.isEditMode
            ? 'User updated with success ✔️'
            : 'User created with success ✔️';

        this.snackBar.open(message, 'Fechar', {
            duration: 4000,
            panelClass: ['success-snackbar']
        });
    }

    private handleError(err: any) {
        console.error('Error:', err);
        const errorMessage = err.error?.message || 'Operation failed';
        const message = this.isEditMode
            ? `❌ Failed to update user: ${errorMessage}`
            : `❌ Failed to create user: ${errorMessage}`;

        this.snackBar.open(message, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
        });
    }
}