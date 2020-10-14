import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DespesaService } from '../services/despesas.service';

interface Despesa {
  tipo: number;
  fornec: string;
  ano: number;
  mes: number;
  dia: number;
  valor: number;
}

interface DespesaSenador {
  id: number;
  nomeSenador: string;
  despesas: Despesa[];
}

@Component({
  selector: 'app-despesas-senadores',
  templateUrl: './despesas-senadores.component.html',
  styleUrls: ['./despesas-senadores.component.css'],
})
export class DespesasSenadoresComponent implements OnInit {
  constructor(
    private despesaService: DespesaService,
    private route: ActivatedRoute
  ) {}

  id: number;
  nomeSenador: string;
  despesasSenador: DespesaSenador;
  total: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = parseInt(paramMap.get('id'));

      this.despesaService
        .buscaDespesasSenador(this.id)
        .subscribe((despesas) => {
          this.id = despesas.id;
          this.nomeSenador = despesas.nomeSenador;
          this.despesasSenador = despesas;

          this.total = Number(
            this.despesasSenador.despesas
              // .filter((x) => x.tipo === 1)
              .reduce((acc, curr) => {
                return acc + curr.valor;
              }, 0)
              .toFixed(2)
          );
        });
    });
  }
}
