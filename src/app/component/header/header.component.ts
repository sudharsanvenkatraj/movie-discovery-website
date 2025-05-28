import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
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
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isInWishlist = []
  constructor() { }


  checkWishlist() {
    const storedData = localStorage.getItem('addedWishlist');
    let existingArray = storedData ? JSON.parse(storedData) : [];
    if (existingArray.length > 0) {
      this.isInWishlist = existingArray.map((item: any) => {

        return {
          id: item.id,
          title: item.title,
          poster_path: item.poster_path || '', // Ensure poster_path is defined
        };
      })
    } else {
      this.isInWishlist = []
      localStorage.setItem('addedWishlist', JSON.stringify([]));
    }
    return existingArray.length;
  }

}
