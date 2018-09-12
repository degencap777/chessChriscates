import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ChessService } from './chess.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        'path': '',
        'component': IndexComponent
      }
    ])
  ],
  providers: [ChessService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
