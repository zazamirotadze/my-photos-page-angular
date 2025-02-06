import { Component, inject, ElementRef, ViewChild} from '@angular/core';
import { PhotosDataService } from '../../services/photoService/photosData.service';
import { ButtonComponent } from '../button/button.component';
import { OutsideClickService } from '../../services/outsideClickService/outside-click.service';

@Component({
  selector: 'app-buttons',
  imports: [ButtonComponent],
  providers: [OutsideClickService],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  readonly photosData: PhotosDataService = inject(PhotosDataService)
  protected readonly outsideClick: OutsideClickService = inject(OutsideClickService);

  @ViewChild('menu') menuElement: ElementRef | null = null;

  ngAfterViewInit() {
    this.outsideClick.setMenuElement(this.menuElement);
  }
}
