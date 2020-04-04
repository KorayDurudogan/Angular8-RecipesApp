import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { NewRecipeComponent } from './recipes/new-recipe/new-recipe.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'recipes', pathMatch: 'full' },
      {
        path: 'recipes', component: RecipesComponent, children: [
          { path: '', component: RecipesListComponent },
          { path: 'new', component: NewRecipeComponent },
          { path: ':id', component: RecipesDetailComponent }
        ]
      }
    ]
  }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
