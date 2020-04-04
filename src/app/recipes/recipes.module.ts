import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { ShortenPipe } from '../shared/shorten.pipe';
import { RecipesItemComponent } from './recipes-list/recipes-item/recipes-item.component';
import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { DirectionsComponent } from './recipes-detail/directions/directions.component';
import { IngredientsComponent } from './recipes-detail/ingredients/ingredients.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipesService } from './recipes.service';

@NgModule({
  declarations: [
    RecipesListComponent,
    ShortenPipe,
    RecipesItemComponent,
    RecipesComponent,
    RecipesDetailComponent,
    DirectionsComponent,
    IngredientsComponent,
    NewRecipeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [RecipesService]
})
export class RecipesModule { }
