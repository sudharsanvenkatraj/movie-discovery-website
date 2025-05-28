import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development'
import { catchError, Observable, tap, throwError } from 'rxjs';

// Define Config interface or import it from the correct location
export interface Config {
  // Add properties according to the expected response structure
  // For example:
  results: any[];
  page: number;
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class TmdbServiceTsService {

  constructor(public httpClient: HttpClient) { }
// https://api.themoviedb.org/3/trending/movie/day?language=en-US

  getTrendingMovies(): Observable<Config> {
    return this.httpClient.get<Config>(`${environment.COMMON_URL}trending/movie/day?language=en-US`)
      .pipe(
        tap(data => data.results),
        catchError(this.handleError)
      );
  }

  getMovieDetails(genres_id: number, page: number = 1): Observable<Config> {
    return this.httpClient.get<Config>(`${environment.COMMON_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genres_id}`)
      .pipe(
        tap(data => data.results),
        catchError(this.handleError)
      );
  }

   getSpecificMovieDetails(_id: number): Observable<Config> {
    return this.httpClient.get<Config>(`${environment.COMMON_URL}movie/${_id}?language=en-US`)
      .pipe(
        tap(data => data.results),
        catchError(this.handleError)
      );
  }

  getActorDetails(actor: string): Observable<Config> {
    return this.httpClient.get<Config>(`${environment.COMMON_URL}search/person?query=${actor}&include_adult=false&language=en-US&page=1`)
      .pipe(
        tap(data => data.results),
        catchError(this.handleError)
      );
  }
  getMoviesActorDetail(name: number): Observable<Config> {
    
    return this.httpClient.get<Config>(`${environment.COMMON_URL}search/movie?query=${name}&include_adult=false&language=en-US&page=1`)
      .pipe(
        tap(data => data.results),
        catchError(this.handleError)
      );
  }
  private handleError(err: HttpErrorResponse): Observable<never> {
    // just a test ... more could would go here
    return throwError(() => err);
  }


}
