import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { TmdbServiceTsService } from '../../core/services/tmdb.service.ts.service';
import { of, throwError } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;
  let mockTmdbService: jasmine.SpyObj<TmdbServiceTsService>;

  const mockMovies = {
    results: [
      { id: 1, title: 'Movie 1', isclicked: false },
      { id: 2, title: 'Movie 2', isclicked: false }
    ]
  };
beforeEach(async () => {
  mockTmdbService = jasmine.createSpyObj('TmdbServiceTsService', [
    'getTrendingMovies',
    'getMovieDetails',
    'getActorDetails',
    'getMoviesActorDetail'
  ]);

  mockTmdbService.getTrendingMovies.and.returnValue(of({ results: [] } as any));

  await TestBed.configureTestingModule({
    imports: [LandingComponent],
    providers: [
      { provide: TmdbServiceTsService, useValue: mockTmdbService },
 
      provideRouter([]),
    ]
  }).compileComponents();

  fixture = TestBed.createComponent(LandingComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trending movies on init', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    mockTmdbService.getTrendingMovies.and.returnValue(of(mockMovies as any));

    component.ngOnInit();
    tick(1000);

    expect(component.movieList.length).toBe(2);
    expect(component.heading).toBe('Trending Movies');
    expect(component.loading).toBeFalse();
  }));

  it('should handle error on trending movie fetch', () => {
    mockTmdbService.getTrendingMovies.and.returnValue(throwError(() => new Error('Error')));
    spyOn(console, 'error');

    component.getTrendingMovies();

    expect(console.error).toHaveBeenCalled();
  });

  it('should toggle wishlist correctly', () => {
    const movie = { id: 1, isclicked: false };
    component.movieList = [movie];

    spyOn(localStorage, 'getItem').and.returnValue(null);
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.toggleWishlist(1, movie as any);

    expect(component.movieList[0].isclicked).toBeTrue();
    expect(setItemSpy).toHaveBeenCalled();
  });

  it('should fetch movies by genre', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    mockTmdbService.getMovieDetails.and.returnValue(of(mockMovies) as any);

    component.getMovies(1, 'Action');
    tick(1000);

    expect(component.heading).toBe('Action');
    expect(component.movieList.length).toBe(2);
  }));

  it('should search actors and movies', () => {
    const eventMock = { target: { value: 'tom cruise' } };
    mockTmdbService.getActorDetails.and.returnValue(of({ results: [{ known_for_department: 'Acting' }] } as any));
    mockTmdbService.getMoviesActorDetail.and.returnValue(of(mockMovies)as any);

    component.filterResults(eventMock);

    expect(component.heading).toContain('Results found for actors');
  });

  it('should skip search if input is too short', () => {
    const eventMock = { target: { value: 'tom' } };
    component.filterResults(eventMock);

    expect(component.heading).toBe('');
    expect(component.movieList).toEqual([]);
    expect(component.actorDetailsList).toEqual([]);
  });

});
