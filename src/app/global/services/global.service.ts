import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../../environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private baseUrl = environment.baseUrl;

  public searchText: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public countries: Country[] = [];
  public onCountriesChanged: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);

  constructor (private http: HttpClient) { }

  public getCountries (update: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.countries.length && !update) {
        resolve();
      } else {
        this.http.get(`${ this.baseUrl }statistics/countries`)
          .subscribe((res: any) => {
            this.countries = res.map(obj => new Country(obj));
            this.onCountriesChanged.next(this.countries);

            resolve();
          }, reject);
      }
    });
  }
}
