import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { HeaderpageComponent } from "./headerpage/headerpage.component";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [IonicModule.forRoot()],
    declarations:[HeaderpageComponent],
    exports:[HeaderpageComponent,TranslateModule],
})

export class ComponentsModule{

}