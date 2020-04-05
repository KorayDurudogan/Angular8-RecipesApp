import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import json_recipes from '../data/recipes.json'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  recipesChanged = new Subject<Recipe[]>();

  recipes: Recipe[]

  constructor() { }

  fetchRecipes() {
    if (!this.recipes) {
      this.recipes = [];

      json_recipes.map((recipe) => {
        this.recipes.push(new Recipe(recipe.name, recipe.description, recipe.image_path, recipe.directions, recipe.ingredients));
      });
    }
    this.recipesChanged.next(this.recipes);
  }

  fetchRecipe(id: number) {
    return this.recipes.find(r => r.id == id);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  deleteRecipe(id: number) {
    this.recipes = this.recipes.filter(r => r.id != id);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(recipe: Recipe) {
    let recipeIndex = this.recipes.findIndex(r => r.id == recipe.id);
    this.recipes[recipeIndex] = recipe;
    this.recipesChanged.next(this.recipes);
  }
}
