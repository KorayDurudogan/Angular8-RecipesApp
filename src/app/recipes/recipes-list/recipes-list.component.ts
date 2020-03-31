import { Component, OnInit, OnDestroy } from '@angular/core';

import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription;
  recipes: Recipe[];

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    this.recipeService.fetchRecipes();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
