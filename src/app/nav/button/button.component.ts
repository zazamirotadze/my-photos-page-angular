import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { LocalizedName } from '../../services/photoService/photosDataModels';

@Component({
  selector: 'app-button',
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  protected  readonly route: ActivatedRoute = inject(ActivatedRoute);
  @Input() categoryName: LocalizedName | null = null;
}
