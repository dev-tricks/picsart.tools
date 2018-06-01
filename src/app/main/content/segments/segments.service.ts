import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Operator } from './operator';
import { Segment } from './segment';
import { Selector } from './selector';

@Injectable({
  providedIn: 'root'
})
export class SegmentsService implements Resolve<any> {
  private baseUrl: string = environment.baseUrl;

  public segments: Segment[];
  public onSegmentsChanged: BehaviorSubject<Segment[]> = new BehaviorSubject([]);

  public selectorsAndOperators: any[] = [];
  public onSelectorsAndOperatorsChanged: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor (private http: HttpClient) { }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getSegments()
      ]).then(resolve, reject);
    });
  }

  public getSegments (): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`${ this.baseUrl }apps/1/segmentation/segments`)
        .subscribe((res: any) => {
          this.segments = res.map(obj => new Segment(obj.segment));
          this.onSegmentsChanged.next(this.segments);

          resolve();
        }, reject);
    });
  }

  public getSelectorsAndOperators (update: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.selectorsAndOperators.length && !update) {
        resolve();
      } else {
        Promise.all([
          this.getSelectorsAndOperatorsByName('selectors'),
          this.getSelectorsAndOperatorsByName('includeExcludeOperators'),
          this.getSelectorsAndOperatorsByName('compareOperators'),
          this.getSelectorsAndOperatorsByName('newUserOperators'),
          this.getSelectorsAndOperatorsByName('mapOperators'),
        ]).then((data) => {
          data.map((item, index) => {
            this.selectorsAndOperators.push(item.map(obj => index === 0 ? new Selector(obj) : new Operator(obj)));
          });
          this.onSelectorsAndOperatorsChanged.next(this.selectorsAndOperators);

          resolve();
        }, reject);
      }
    });
  }

  public getSelectorsAndOperatorsByName (operatorName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${ this.baseUrl }apps/1/segmentation/${ operatorName }`)
        .subscribe(resolve, reject);
    });
  }

  public saveSegment (segment: Segment): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${ this.baseUrl }apps/1/segmentation/segments`, segment)
        .subscribe(resolve, reject);
    });
  }
}
