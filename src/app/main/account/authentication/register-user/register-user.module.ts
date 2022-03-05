import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { MaterialModule } from '../../../angular-material/material.module';
import { RegisterUserComponent } from './register-user.component';
import { AlertModule } from '../../../_shared/alert/alert.module';
import { DialCodeModule } from '../dial-code/dial-code.module';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordDirective} from './password.directive';
import { RegisterSupplierDoneComponent } from '../register-supplier-done/register-supplier-done.component';
import { TitleModule } from 'app/main/common-component/title/title.module';

const routes = [
    {
        path: 'auth/register-user',
        component: RegisterUserComponent
    },
    {
        path: 'auth/register-supplier-done',
        component: RegisterSupplierDoneComponent
    },
];

@NgModule({
    declarations: [
        RegisterUserComponent,
        PasswordDirective,
        RegisterSupplierDoneComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MaterialModule,
        AlertModule,
        DialCodeModule,
        DropdownModule,
        TitleModule
    ],
    exports: [
        RouterModule,
        RegisterUserComponent,
        RegisterSupplierDoneComponent,
    ]
})

export class RegisterUserModule
{
}
