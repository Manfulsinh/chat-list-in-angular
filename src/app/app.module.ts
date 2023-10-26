import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WhatsaapChatComponent } from './whatsaap-chat/whatsaap-chat.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { EnvironmentComponent } from './environment/environment.component'; 

@NgModule({
  declarations: [
    AppComponent,
    WhatsaapChatComponent,
    ModalComponent,EnvironmentComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
