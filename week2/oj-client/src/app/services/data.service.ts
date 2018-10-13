import { Injectable } from '@angular/core';
// import { Problem } from "../models/problem.model";
// import { PROBLEMS } from "../mock-problems";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Problem } from '../models/problem.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {
	//problems : Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  constructor(private httpClient: HttpClient) { }

  getProblems(): Observable<Problem[]> {
         this.httpClient.get('api/v1/problems')
       .toPromise()
       .then((res: any) => {
          // .next:  next data
          this._problemSource.next(res);
       })
       .catch(this.handleError);
     return this._problemSource.asObservable();
   }
  getProblem(id: number): Promise<Problem> {
        return this.httpClient.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: any) => res) // same as { return res }
      .catch(this.handleError);
  }

  addProblem(problem: Problem){
      const options = { headers: new HttpHeaders( { 'Content-Type': 'application/json'})};
      return this.httpClient.post('api/v1/problems', problem, options)
             .toPromise()
             .then((res: any) => {
               // any: type, don't care the type
               // update the _problemSource
               this.getProblems();
               return res;
             })
             .catch(this.handleError);
  }

  private handleError(error: any):  Promise<any> {
    return Promise.reject(error.body || error);
  }
}
