import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, VirtualTimeScheduler, Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestfulApiService {

  private REST_API_SERVER = 'http://localhost:8080';

  public TOKEN: string = '';

  constructor(private httpClient: HttpClient) {
  }

  SetToken(token: string) {
    this.TOKEN = token;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public Login(Usuario: any): Observable<any> {

    const url = this.REST_API_SERVER + '/cliente/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json',
      }),
    };

    return this.httpClient.post(url, JSON.stringify(Usuario), httpOptions);
  }

  public getAllClientes() {
    const url = this.REST_API_SERVER + '/cliente';

    const headers = new HttpHeaders({ 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': this.TOKEN });

    return this.httpClient.get<any>(url, { headers: headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  public createCliente(Cliente: any): Observable<any> {
    const url = this.REST_API_SERVER + '/cliente';

    const headers = new HttpHeaders({ 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': this.TOKEN });

    return this.httpClient.post(url, JSON.stringify(Cliente), { headers: headers });
  }

  public updateCliente(codigoCliente: number, Cliente: any): Observable<any> {
    const url = this.REST_API_SERVER + '/cliente/' + codigoCliente;

    const headers = new HttpHeaders({ 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': this.TOKEN });

    return this.httpClient.put(url, JSON.stringify(Cliente), { headers: headers });
  }

  public deleteCliente(codigoCliente: number): Observable<any> {
    const url = this.REST_API_SERVER + '/cliente/' + codigoCliente;

    const headers = new HttpHeaders({ 'Accept': '*/*', 'Content-Type': 'application/json', 'Authorization': this.TOKEN });

    return this.httpClient.delete(url, { headers: headers });
  }





}
