import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable }    from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = 'https://mighty-coast-86225.herokuapp.com/?url=';  // URL to web api

  constructor(private http: Http) { }

  getAPI(api: string): Promise<any> {
    return this.http.get(this.baseUrl+api)
              .toPromise()
              .then(response => response.json() as any)
              .catch(this.handleError);
  }

  getLocalAPI(api: string): Promise<any> {
    return this.http.get(api)
              .toPromise()
              .then(response => response.json() as any)
              .catch(this.handleError);
  }

  post(url: string, data: any): Promise<any> {
	  let headers = new Headers();
	  headers.append('Content-Type', 'application/json');
	  return this.http.post(url, {data: data}, {
		  headers: headers
	  })
	  .toPromise()
	  .then(res => res.json() as any)
	  .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
  }
}