import { Acao, AcoesAPI } from './modelo/acoes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, pluck, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private httpClient: HttpClient) {}

  getAcoes(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<AcoesAPI>('http://localhost:3000/acoes', { params })
      .pipe(
        tap((acoes) => console.log(acoes)),
        pluck('payload'),
        map((acoes) => acoes.sort((a, b) => this.ordenaPorCodigo(a, b)))
      );
  }

  private ordenaPorCodigo(a: Acao, b: Acao) {
    if (a.codigo > b.codigo) {
      return 1;
    }
    if (a.codigo < b.codigo) {
      return -1;
    }
    return 0;
  }
}
