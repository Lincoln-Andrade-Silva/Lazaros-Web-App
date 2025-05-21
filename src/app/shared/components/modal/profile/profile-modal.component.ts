import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { ProfileResponse } from '../../../../shared/model/profile/ProfileResponse';
import { lastValueFrom } from 'rxjs';

@Component({
    selector: 'app-profile-modal',
    standalone: true,
    templateUrl: './profile-modal.component.html',
    styleUrls: ['./profile-modal.component.css'],
    imports: [
        CommonModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
    ]
})
export class ProfileModalComponent {
    isLoading = false;
    isEditMode = false;
    profileForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private snackBar: MatSnackBar,
        private profileService: ProfileService,
        public dialogRef: MatDialogRef<ProfileModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { profile: ProfileResponse }
    ) {
        this.profileForm = this.fb.group({
            description: ['', Validators.required]
        });

        if (data?.profile) {
            this.isEditMode = true;
            this.profileForm.patchValue(data.profile);
        }
    }

    async handleSubmit() {
        if (this.profileForm.valid) {
            this.isLoading = true;
            try {
                await this.delay(1000);

                if (this.isEditMode) {
                    await lastValueFrom(
                        this.profileService.edit(
                            this.data.profile.id,
                            this.profileForm.value
                        )
                    );
                } else {
                    await lastValueFrom(
                        this.profileService.create(this.profileForm.value)
                    );
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

    private async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private showSuccessMessage() {
        const message = this.isEditMode
            ? 'Profile updated successfully ✔️'
            : 'Profile created successfully ✔️';

        this.snackBar.open(message, 'Close', {
            duration: 4000,
            panelClass: ['success-snackbar']
        });
    }

    private handleError(err: any) {
        console.error('Error:', err);
        const errorMessage = err.error?.message || 'Operation failed';
        const message = this.isEditMode
            ? `❌ Failed to update profile: ${errorMessage}`
            : `❌ Failed to create profile: ${errorMessage}`;

        this.snackBar.open(message, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
        });
    }
}