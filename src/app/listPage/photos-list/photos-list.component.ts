import { Component, inject, signal, WritableSignal, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';
import { PhotosDataService } from '../../services/photoService/photosData.service';
import { PaginationComponent } from '../pegination/pagination.component';
import { Subscription } from 'rxjs';
import { Photo } from '../../services/photoService/photosDataModels';

@Component({
  selector: 'app-photos-list',
  imports: [PhotoComponent, PaginationComponent],
  templateUrl: './photos-list.component.html',
  styleUrl: './photos-list.component.scss'
})
export class PhotosListComponent implements OnInit, OnDestroy {
  readonly postsPerPage: number = 9;
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly photosData: PhotosDataService = inject(PhotosDataService);

  currentPage: WritableSignal<number> = signal(1);
  totalPosts: WritableSignal<number> = signal(0); 
  currentPhotos: WritableSignal<Photo[] | []> = signal([]);

  private queryParamsSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      // ყველა ფოტო
      const allPhotos = this.photosData.getAllPhotos(params['categoryName']) || [];
      this.totalPosts.set(allPhotos.length)

      // მიმდინარე გვერდი
      const page = Number(params['page']) || 1;
      this.currentPage.set(page);

      // მიმდინარე გვერდის მიხედვით ფოტოები
      const lastPostIndex = this.currentPage() * this.postsPerPage;
      const firstPostIndex = lastPostIndex - this.postsPerPage;
      this.currentPhotos.set( allPhotos.slice(firstPostIndex, lastPostIndex) );
    });
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription?.unsubscribe();
  }
}
