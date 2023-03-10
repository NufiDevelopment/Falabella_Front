import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Curp } from 'src/app/Domain/Models/curp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string = environment.Api_Endpoint;
  key_azure: string = environment.key_nufi_azure;
  value_azure: string = environment.value_nufi_azure;
  headers: HttpHeaders = new HttpHeaders;
  options!: {};

  constructor(private httpClient: HttpClient) { }

  setHeaders()
  {
    this.headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': this.value_azure,
      'Access-Control-Allow-Origin': '*' ,
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Credentials':'true',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT,HEAD',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',      
    });

    this.options = { headers: this.headers };
  }

  getCURP(dataRequest:Curp):Observable<any>{
    this.setHeaders();
    return this.httpClient.post(this.apiUrl + "Curp/v1/consulta",dataRequest, this.options);
  }

  getPrueba(rfc:string):Observable<any>{
    this.setHeaders();
    return this.httpClient.post(this.apiUrl + "certificadosat/v1/consultar/consultar",rfc, this.options);
  }

}
