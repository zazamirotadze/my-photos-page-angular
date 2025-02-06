import { Component, inject, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() totalPosts: number = 0;
  @Input() postsPerPage: number = 0;
  @Input() currentPage: number = 1;
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);

  getPages(): Array<number>{
    let pages: Array<number> = []

    // პოსტების მთლიანი რაოდენობა და თითოეულ გვერდზე მისი რაოდენობა მხოლოდ დადებითი და თვლადი შეიძლება იყოს
    if (this.totalPosts > 0 && this.postsPerPage > 0 && Number.isFinite(this.totalPosts) && Number.isFinite(this.postsPerPage)) {
        const totalPages = Math.ceil(this.totalPosts / this.postsPerPage);

        for(let i=1; i<= totalPages; i++){
          pages.push(i);
        }
    }

    return pages
  } 
}
