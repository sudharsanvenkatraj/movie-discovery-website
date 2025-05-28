import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('checkWishlist()', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('should return 0 if wishlist is empty or not set', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(localStorage, 'setItem');

      const length = component.checkWishlist();

      expect(length).toBe(0);
      expect(component.isInWishlist).toEqual([]);
      expect(localStorage.setItem).toHaveBeenCalledWith('addedWishlist', JSON.stringify([]));
    });

    it('should return number of items if wishlist exists', () => {
      const mockWishlist = [
        { id: 1, title: 'Movie 1', poster_path: 'poster1.jpg' },
        { id: 2, title: 'Movie 2' }
      ];
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockWishlist));

      const length = component.checkWishlist();

      expect(length).toBe(2);
      expect(component.isInWishlist.length).toBe(2);
      expect(component.isInWishlist[1]['poster_path']).toBe('');
    });
  });
});
