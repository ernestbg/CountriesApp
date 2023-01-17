import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  private apiUrlRegion: string = 'https://restcountries.com/v2';

  get httpParams(){
    return new HttpParams().set(
      'fields',
      'name,capital,flags,population'
    );
  }

  constructor(private http: HttpClient) {}

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.http.get<Country[]>(url);
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.http.get<Country[]>(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    
    const url = `${this.apiUrlRegion}/regionalbloc/${region}`;

    return this.http.get<Country[]>(url, { params: this.httpParams }).pipe(tap(console.log));
  }

  getCountryByCode(id: string): Observable<Country[]> {
    const url = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country[]>(url);
  }
}
