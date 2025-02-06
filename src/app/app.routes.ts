import { Routes } from '@angular/router';
import { PhotosListComponent } from './listPage/photos-list/photos-list.component';
import { DetailsPageComponent } from './details-page/details-page.component';

export const routes: Routes = [
    {   
        path: '',  
        component: PhotosListComponent
    },
    {
        path: 'details',  
        component: DetailsPageComponent
    }
];
