import { Component } from '@angular/core';
import { ButtonsComponent } from './buttons/buttons.component';
import { LanguagesComponent } from './languages/languages.component';

@Component({
  selector: 'app-nav',
  imports: [ButtonsComponent, LanguagesComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
