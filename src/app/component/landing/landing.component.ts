import {  Component } from '@angular/core';
import { TmdbServiceTsService } from '../../core/services/tmdb.service.ts.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string; 
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  isclicked?: boolean; 
}

@Component({
  selector: 'app-landing',
  imports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',

})
export class LandingComponent {

  movieList: any = [];
  loading: boolean = false;
  actorDetailsList: any = [];
  isSearching: boolean = false;
  heading: string = "";
  
  constructor(private tmdbServiceTsService: TmdbServiceTsService) {}

  ngOnInit() {
    this.getTrendingMovies();
  }
  getTrendingMovies() {
    this.loading = true;
    this.isSearching = false;
    this.tmdbServiceTsService.getTrendingMovies().subscribe({
      next: (res) => {
        setTimeout(() => {
          this.movieList = res.results.map((item: Movie) => {
            item.isclicked = false
            return item;
          })
          this.heading = "Trending Movies";
          const storedData = localStorage.getItem('addedWishlist');
          let existingArraylust = storedData ? JSON.parse(storedData) : [];
          if (existingArraylust.length > 0) {
            this.movieList.forEach((item: Movie) => {
              item.isclicked = existingArraylust.some((movie: Movie) => movie.id === item.id);
            });
          }

          this.loading = false;
        }, 1000)
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
  toggleWishlist(id: number, item: Movie) {
    this.movieList = this.movieList.map((item: any) => {
      if (item.id === id) {
        item.isclicked = !item.isclicked;
      }
      return item;
    })
    const storedData = localStorage.getItem('addedWishlist');
    let existingArray = storedData ? JSON.parse(storedData) : [];
    if (item.isclicked) {
      existingArray.push(item);
    } else {
      existingArray = existingArray.filter((movie: Movie) => movie.id !== id);
    }
    localStorage.setItem('addedWishlist', JSON.stringify(existingArray));
  }



  getMovies(genres_id: number, title: string) {
    this.heading = title;
    this.loading = true;
    this.isSearching = false;
    this.tmdbServiceTsService.getMovieDetails(genres_id).subscribe({
      next: (res) => {
        setTimeout(() => {

          this.movieList = res.results.map((item: Movie) => {
            item.isclicked = false
            return item;
          })

          const storedData = localStorage.getItem('addedWishlist');
          let existingArraylust = storedData ? JSON.parse(storedData) : [];
          if (existingArraylust.length > 0) {
            this.movieList.forEach((item: Movie) => {
              item.isclicked = existingArraylust.some((movie: Movie) => movie.id === item.id);
            });
          }

          this.loading = false;
        }, 1000)
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  filterResults(movie: any) {
    this.loading = true;
    this.isSearching = true;
    if (movie.target.value.length > 4) {
      this.getActorList(movie);
      this.getMovieList(movie);
    }
  }

  getActorList(movie: any) {
    this.tmdbServiceTsService.getActorDetails(movie.target.value.toLowerCase()).subscribe({
      next: (res) => {
        this.actorDetailsList = res.results.filter((item: any) => item.known_for_department === 'Acting');
        this.heading = `Results found for actors:   ${(this.actorDetailsList.length > 0) ? this.actorDetailsList.length : 'N/A'} and movies:   ${(this.movieList.length > 0) ? this.movieList.length : 'N/A'}`;
        this.loading = false;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  getMovieList(movie: any) {
    this.tmdbServiceTsService.getMoviesActorDetail(movie.target.value.toLowerCase()).subscribe({
      next: (res) => {

        this.movieList = res.results;
        this.loading = false;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
