import { NgModule } from '@angular/core';
import { LoginModule} from './authentication/login/login.module';
import { ForgotPasswordModule} from './authentication/forgot-password/forgot-password.module';
import { DialCodeModule } from './authentication/dial-code/dial-code.module'
import { DropdownModule } from 'primeng/dropdown';

import { ContactUsModule } from './contact-us/contact-us.module';
import { ResentEmailModule } from './authentication/resent-email/resent-email.module';
import { RegisterUserModule } from './authentication/register-user/register-user.module';
import { EmployeeManagementModule } from './employee-management/employee-management.module';

@NgModule({
    imports: [
        LoginModule,
        ForgotPasswordModule,
        DialCodeModule,
        DropdownModule,
        ContactUsModule,
        ResentEmailModule,
        RegisterUserModule,
        EmployeeManagementModule
    ],
    exports:[],
    declarations: []
})
export class PagesModule
{

}
