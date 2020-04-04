import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.fetchRecipe(id);
  }

  deleteRecipe(i: number) {
    this.recipeService.deleteRecipe(i);
    this.router.navigate(['recipes']);
  }
}
