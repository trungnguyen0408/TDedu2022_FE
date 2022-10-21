import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class AlertMessageService {
    private defaultDuration = 2000;
    private verticalPosition: MatSnackBarVerticalPosition = 'top';
    private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    actionButtonLabel: string = 'x';

    constructor(private snackBar: MatSnackBar) {
    }

    toast(message: string, options?: any) {
        this.snackBar.open(message, this.actionButtonLabel, this.createMatSnackBarConfig());
    }

    info(message: string, options?: any) {
        this.snackBar.open(message, this.actionButtonLabel, this.createMatSnackBarConfig('bg-info'));
    }

    success(message: string, options?: any) {
        this.snackBar.open(message, this.actionButtonLabel, this.createMatSnackBarConfig('bg-success'));
    }

    warn(message: string, options?: any) {
        this.snackBar.open(message, this.actionButtonLabel, this.createMatSnackBarConfig('bg-warning'));
    }

    error(message: string, options?: any) {
        this.snackBar.open(message, this.actionButtonLabel, this.createMatSnackBarConfig('bg-danger'));
    }

    private createMatSnackBarConfig(panelClass?: string): MatSnackBarConfig {
        const config = new MatSnackBarConfig();
        config.duration = this.defaultDuration;
        config.verticalPosition = this.verticalPosition;
        config.horizontalPosition = this.horizontalPosition;
        config.panelClass = [];
        if (panelClass) {
            config.panelClass.push(panelClass);
        }
        return config;
    }
}
