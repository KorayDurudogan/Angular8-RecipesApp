import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ShortenPipe } from '../shared/shorten.pipe';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesComponent } from './recipes.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { DirectionsComponent } from './recipes-detail/directions/directions.component';
import { IngredientsComponent } from './recipes-detail/ingredients/ingredients.component';

@NgModule({
  declarations: [
    RecipesListComponent,
    ShortenPipe,
    RecipesItemComponent,
    RecipesComponent,
    RecipesDetailComponent,
    DirectionsComponent,
    IngredientsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RecipesRoutingModule
  ]
})
export class RecipesModule { }
