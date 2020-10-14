import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DespesaService } from '../services/despesas.service';

interface Senador {
  id: number;
  nomeSenador: string;
}

@Component({
  selector: 'app-senadores',
  templateUrl: './senadores.component.html',
  styleUrls: ['./senadores.component.css'],
})
export class SenadoresComponent implements OnInit {
  constructor(private despesaService: DespesaService, private router: Router) {}

  senadores: Senador[] = [];

  ngOnInit(): void {
    this.despesaService.buscaSenadores().subscribe((senadores) => {
      this.senadores = senadores;
    });
  }

  // constructor() {}

  detalharDespesas(id: number) {
    this.router.navigate(['despesassenadores', id]);
  }
}
