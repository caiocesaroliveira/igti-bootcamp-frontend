import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const urlBase: string = 'http://localhost:3333';

interface Senador {
  id: number;
  nomeSenador: string;
}

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

export const tipos = {
  1: 'Aluguel de imóveis e despesas concernentes a eles',
  2: 'Divulgação da atividade parlamentar',
  3: 'Aquisição de material de consumo para uso no escritório',
  4: 'Passagens aéreas, aquáticas e terrestres nacionais',
  5: 'Contratação de consultorias, assessorias, pesquisas, trabalhos técnicos e outros serviços',
  6: 'Locomoção, hospedagem, alimentação e combustíveis',
  7: 'Serviços de Segurança Privada',
};

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  constructor(private httpClient: HttpClient) {}

  buscaDespesasSenador(id: Number) {
    return this.httpClient.get<DespesaSenador>(
      `${urlBase}/despesassenadores/${id}`
    );
  }
  buscaSenadores() {
    return this.httpClient.get<Senador[]>(`${urlBase}/senadores`);
  }
}
