import { Component, ElementRef, inject, ViewChild, } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { PhotosDataService } from '../../services/photoService/photosData.service';
import { OutsideClickService } from '../../services/outsideClickService/outside-click.service';

@Component({
  selector: 'app-languages',
  imports: [RouterLink],
  providers: [OutsideClickService],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss'
})
export class LanguagesComponent {
  protected readonly outsideClick: OutsideClickService = inject(OutsideClickService);
  protected readonly route: ActivatedRoute = inject(ActivatedRoute);
  protected readonly photosData: PhotosDataService = inject(PhotosDataService );

  @ViewChild('languagesMenu')  menuElement: ElementRef | null = null;
  
  ngAfterViewInit(): void {
    this.outsideClick.setMenuElement(this.menuElement);
  }
}
