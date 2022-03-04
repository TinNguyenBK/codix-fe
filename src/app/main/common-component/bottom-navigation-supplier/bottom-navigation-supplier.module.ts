import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'app/main/angular-material/material.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { BottomNavigationSupplierComponent } from './bottom-navigation-supplier.component';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        BottomNavigationSupplierComponent
    ],
    imports: [
        TranslateModule,
        MaterialModule,
        FuseSharedModule,
        RouterModule
    ],
    exports: [
        BottomNavigationSupplierComponent
    ]
})

export class BottomNavigationSupplierModule {
}
