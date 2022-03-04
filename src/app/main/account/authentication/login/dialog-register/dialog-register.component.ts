import { Component, Inject , ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector   : 'fuse-dialog-register',
    templateUrl: './dialog-register.component.html',
    styleUrls  : ['./dialog-register.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class DialogRegisterComponent
{
    public confirmMessage: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmDialogComponent>} dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<DialogRegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
            if(data){
                this.confirmMessage = data.message || this.confirmMessage;
            }
        }

}
