import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';

const recipeRoutes: Routes = [
    { path: '', redirectTo: 'recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipes/:id', component: RecipesDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(recipeRoutes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }