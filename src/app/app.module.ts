import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {viewlistService} from './viewlist/viewlist.service';
import { AppComponent } from './app.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { TableFilterPipe } from './pipe/table-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ViewlistComponent,
    TableFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxFileDropModule
  ],
  providers: [viewlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }

