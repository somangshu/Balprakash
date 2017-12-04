import { HttpParams, HttpClient } from '@angular/common/http';
import { Video } from './video';
import { Response, Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

function extractData(response: Response): Video[] {
  // The response of the API has a results
  // property with the actual results
  console.log('hell', response);
  return response.json().results.map(toVideo);
}

function toVideo(r: any): Video {
  const video = <Video>({
    id: r.id,
    name: r.name,
  });

  return video;
}

function handleError(error: any) {
  // log error
  // could be something more sofisticated
  const errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`;
  console.error(errorMsg);

  // throw an application level error
  return Observable.throw(errorMsg);
}

@Injectable()
export class VideosService {
  private baseUrl = 'https://www.googleapis.com/youtube/v3/search';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Video[]> {
    let params = new HttpParams();
    params = params.append('key', 'AIzaSyAR33qYwlwVJXAfyoGbBv_TAr3WGhrMobc');
    params = params.append('channelId', 'sonymusicindiaSME');
    params = params.append('order', 'date');
    params = params.append('part', 'snippet,id');
    params = params.append('maxResults', '20');
    const video$ = this.http
      .get(`${this.baseUrl}`, { params: params })
      .map(extractData)
      .catch(handleError);
    return video$;
  }

  private getHeaders() {
    // I included these headers because otherwise FireFox
    // will request text/html instead of application/json
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
