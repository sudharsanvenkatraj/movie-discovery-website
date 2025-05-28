import { TestBed } from '@angular/core/testing';
import {  HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TmdbServiceTsService, Config } from './tmdb.service.ts.service';

import { environment } from '../../../environments/environment.development';
import { provideHttpClient } from '@angular/common/http';

describe('TmdbServiceTsService', () => {
  let service: TmdbServiceTsService;
  let httpMock: HttpTestingController;

  const mockResponse: Config = {
    results: [{ title: 'Sample Movie' }],
    page: 1,
    total_pages: 10,
    total_results: 100
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
       
      ],
      providers: [TmdbServiceTsService,  provideHttpClient(),
   provideHttpClientTesting()]
    });

    service = TestBed.inject(TmdbServiceTsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trending movies', () => {
    service.getTrendingMovies().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.COMMON_URL}trending/movie/day?language=en-US`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movie details by genre', () => {
    const genreId = 28;
    service.getMovieDetails(genreId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.COMMON_URL}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch specific movie details by ID', () => {
    const movieId = 123;
    service.getSpecificMovieDetails(movieId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.COMMON_URL}movie/${movieId}?language=en-US`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch actor details by name', () => {
    const actorName = 'Tom Hanks';
    service.getActorDetails(actorName).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.COMMON_URL}search/person?query=${actorName}&include_adult=false&language=en-US&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movie details by actor name', () => {
    const actorId = 123;
    service.getMoviesActorDetail(actorId).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.COMMON_URL}search/movie?query=${actorId}&include_adult=false&language=en-US&page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle HTTP error', () => {
    const errorMsg = '404 error';

    service.getTrendingMovies().subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (error) => {
        expect(error.status).toBe(404);
      }
    });

    const req = httpMock.expectOne(`${environment.COMMON_URL}trending/movie/day?language=en-US`);
    req.flush(errorMsg, { status: 404, statusText: 'Not Found' });
  });

});
