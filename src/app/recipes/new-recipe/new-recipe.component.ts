import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  newRecipeForm: FormGroup

  defaultImage = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6';

  constructor(private formBuilder: FormBuilder, private recipeService: RecipesService, private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.newRecipeForm = new FormGroup({
      recipeNameContainer: new FormGroup({ recipeName: new FormControl('', [Validators.required]) }),
      recipeDescriptionContainer: new FormGroup({ recipeDescription: new FormControl() }),
      recipeImagePath: new FormGroup({ imagePath: new FormControl(this.defaultImage) }),
      directionsArray: this.formBuilder.array([this.createDirectionsFormGroup()]),
      ingredientsArray: this.formBuilder.array([this.createIngredientsFormGroup()])
    });
  }

  createDirectionsFormGroup() {
    return new FormGroup({
      direction: new FormControl('', [Validators.required])
    });
  }

  createIngredientsFormGroup() {
    return new FormGroup({
      newIngredient: new FormControl('', [Validators.required])
    })
  }

  addNewIngredient() {
    let ingredientsArray = this.newRecipeForm.get('ingredientsArray') as FormArray;
    let formGroup = this.createIngredientsFormGroup();
    formGroup.addControl('deleteIngredient', new FormControl());

    ingredientsArray.push(formGroup);
  }

  addNewStep() {
    let directionsArray = this.newRecipeForm.get('directionsArray') as FormArray;
    let formGroup = this.createDirectionsFormGroup();
    formGroup.addControl('deleteStep', new FormControl());

    directionsArray.push(formGroup);
  }

  deleteIngredient(ingredientIndex: number) {
    let ingredientsArray = this.newRecipeForm.get('ingredientsArray') as FormArray;
    if (ingredientsArray.length > 1)
      ingredientsArray.removeAt(ingredientIndex);
    else
      ingredientsArray.reset();
  }

  deleteStep(stepIndex: number) {
    let directionsArray = this.newRecipeForm.get('directionsArray') as FormArray;
    if (directionsArray.length > 1)
      directionsArray.removeAt(stepIndex);
    else
      directionsArray.reset();
  }

  submitRecipe() {
    if (this.newRecipeForm.valid) {
      let recipeName = this.newRecipeForm.value.recipeNameContainer.recipeName;
      let recipeDescription = this.newRecipeForm.value.recipeDescriptionContainer.recipeDescription;
      let instructions = this.newRecipeForm.value.directionsArray.map(i => i.direction);
      let ingredients = this.newRecipeForm.value.ingredientsArray.map(i => i.newIngredient);
      let imagePath = this.newRecipeForm.value.recipeImagePath.imagePath;
      imagePath = imagePath != "" ? imagePath : this.defaultImage;

      let recipe: Recipe = new Recipe(recipeName, recipeDescription, imagePath, instructions, ingredients);
      this.recipeService.addRecipe(recipe);
      this.router.navigate(['recipes']);
    }
  }
}
