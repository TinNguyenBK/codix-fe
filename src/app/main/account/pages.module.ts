import { NgModule } from '@angular/core';
import { LoginModule} from './authentication/login/login.module';
import { ForgotPasswordModule} from './authentication/forgot-password/forgot-password.module';
import { DialCodeModule } from './authentication/dial-code/dial-code.module'
import { DropdownModule } from 'primeng/dropdown';

import { ContactUsModule } from './contact-us/contact-us.module';
import { TermAndConditionModule } from './term-and-condition/term-and-condition.module';
import { ResentEmailModule } from './authentication/resent-email/resent-email.module';
import { RegisterSupplierModule } from './authentication/register-supplier/register-supplier.module';

@NgModule({
    imports: [
        LoginModule,
        ForgotPasswordModule,
        DialCodeModule,
        DropdownModule,
        ContactUsModule,
        TermAndConditionModule,
        ResentEmailModule,
        RegisterSupplierModule
    ],
    exports:[],
    declarations: []
})
export class PagesModule
{

}
