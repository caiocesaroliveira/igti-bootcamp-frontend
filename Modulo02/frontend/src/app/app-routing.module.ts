import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DespesasSenadoresComponent } from './despesas-senadores/despesas-senadores.component';
import { SenadoresComponent } from './senadores/senadores.component';

const routes: Routes = [
  { path: '', redirectTo: 'senadores', pathMatch: 'full' },
  { path: 'senadores', component: SenadoresComponent },
  { path: 'despesassenadores/:id', component: DespesasSenadoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
