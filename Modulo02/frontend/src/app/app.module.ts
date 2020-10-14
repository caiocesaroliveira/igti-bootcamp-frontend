import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SenadoresComponent } from './senadores/senadores.component';
import { DespesasSenadoresComponent } from './despesas-senadores/despesas-senadores.component';

@NgModule({
  declarations: [AppComponent, SenadoresComponent, DespesasSenadoresComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
