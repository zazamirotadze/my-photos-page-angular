import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Photo } from '../../services/photoService/photosDataModels';

@Component({
  selector: 'app-photo',
  imports: [RouterLink],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
 
})
export class PhotoComponent {
  @Input() photo: Photo | null = null;
  @Input() route: {language?: string, category?: string;} | null = null;
}
