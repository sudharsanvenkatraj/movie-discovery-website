import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { TmdbServiceTsService } from '../../core/services/tmdb.service.ts.service';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbServiceTsService>;
  let routeParams$: Subject<any>;

  const mockMovieDetail = {
    id: 1,
    title: 'Mock Movie',
    overview: 'Mock Overview'
  };

  beforeEach(async () => {
    tmdbServiceSpy = jasmine.createSpyObj('TmdbServiceTsService', ['getSpecificMovieDetails']);
    routeParams$ = new Subject();

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        { provide: TmdbServiceTsService, useValue: tmdbServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { params: routeParams$.asObservable() }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMoviesById and set movieDetail', fakeAsync(() => {
    tmdbServiceSpy.getSpecificMovieDetails.and.returnValue(of(mockMovieDetail) as any);
    fixture.detectChanges();

    routeParams$.next({ id: 1 });

    tick(1000);

    expect(component.loading).toBeFalse();
    expect(component.movieDetail).toEqual(mockMovieDetail);
    expect(tmdbServiceSpy.getSpecificMovieDetails).toHaveBeenCalledWith(1);
  }));

  it('should handle error from getMoviesById', fakeAsync(() => {

    tmdbServiceSpy.getSpecificMovieDetails.and.returnValue(of(() => { throw new Error('API Error') }) as any);
    fixture.detectChanges();

    routeParams$.next({ id: 123 });

    tick(1000);

    expect(component.loading).toBeFalse();
  }));
});
