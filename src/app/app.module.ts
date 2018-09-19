import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { KatexModule } from 'ng-katex';

import { ChessService } from './chess.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { TictacComponent } from './tictac/tictac.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TictacComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KatexModule,
    RouterModule.forRoot([
      { 'path': '', 'component': IndexComponent },
      { 'path': 'tictac', 'component': TictacComponent }
    ])
  ],
  providers: [ChessService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {

}
