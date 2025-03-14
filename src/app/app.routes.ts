import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CommandPageComponent } from './command-page/command-page.component';
import { BierePageComponent } from './biere-page/biere-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'command/:id',
    component: CommandPageComponent,
  },
  {
    path: 'biere/:id',
    component: BierePageComponent,
  },
];
