import { Component, inject, signal, WritableSignal } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { PhotosDataService } from '../services/photoService/photosData.service';

@Component({
  selector: 'app-details-page',
  imports: [],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent {
  private readonly photosData: PhotosDataService = inject(PhotosDataService)
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);
  selectedPhoto: WritableSignal<{ id: string; name: string; nameGeo: string; url: string } | null> =  signal(null);

  ngOnInit(): void {
    const photoId: string | undefined = this.route.snapshot.queryParams['id'];
    this.selectedPhoto.set(this.photosData.getPhoto(photoId));
  }
}
