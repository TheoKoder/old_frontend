import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Injectable()
export class UIService {
    readonly dialogUI = inject(MatDialog);
    ref: MatDialogRef<ProgressBarComponent> | undefined;
    openDialog() {
        this.ref = this.dialogUI.open(ProgressBarComponent, {
            panelClass: 'transparent',
            disableClose: false,
        });
    }
    closeDialog() {
        //this.delay(30000); // A Delay here to prevent fast clicking from the users
        //this.isLoading = false;
        this.ref!.close();
    }
    async delay(ms: number) {
        await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("intentional delay for ui"));
    }
}