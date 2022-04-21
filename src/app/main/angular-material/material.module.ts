//ng add @angular/material
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const ModuleMaterial = [
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
];

@NgModule({
    imports: [ModuleMaterial],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
    ],
    exports: [ModuleMaterial]
})
export class MaterialModule { }
