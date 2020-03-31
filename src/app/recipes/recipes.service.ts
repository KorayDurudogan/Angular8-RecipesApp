import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import recipes from '../data/recipes.json'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipesChanged = new Subject<Recipe[]>();

  recipes = recipes;

  constructor() { }

  fetchRecipes() {

    let recipes :Recipe[] = [];

    this.recipes.map((recipe) => {
      recipes.push(new Recipe(recipe.id, recipe.name, recipe.description, recipe.image_path, recipe.directions, recipe.ingredients));
    });

    this.recipesChanged.next(recipes);
  }

  fetchRecipe(id: number){
    return this.recipes.find(r => r.id == id);
  }
}
