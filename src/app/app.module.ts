import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { TooltipComponent } from './components/tooltip/tooltipComponent';
import { TooltipDirective } from './components/tooltip/tooltipDirective';
import { TooltipContainerDirective } from './components/tooltip/tooltipContainerDirective';

@NgModule({
  declarations: [
    AppComponent,
    TooltipComponent,
    TooltipDirective,
    TooltipContainerDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TooltipComponent]
})
export class AppModule { }
