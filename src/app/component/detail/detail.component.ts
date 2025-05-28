import { Component } from '@angular/core';
import { TmdbServiceTsService } from '../../core/services/tmdb.service.ts.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-detail',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent {
  movieDetail: any = {};
  loading: boolean = false;

  constructor(private tmdbServiceTsService: TmdbServiceTsService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      this.loading = true;
      this.getMoviesById(movieId);
    })
  }
  getMoviesById(genres_id: number) {
    this.tmdbServiceTsService.getSpecificMovieDetails(genres_id).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.movieDetail = res;
          this.loading = false;
        }, 1000)
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
      complete: () => console.info('complete')
    });
  }

}
