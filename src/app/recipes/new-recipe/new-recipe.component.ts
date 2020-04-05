import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  isEditModeOn = false;
  recipe: Recipe;

  newRecipeForm: FormGroup

  defaultImage = 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101065/112815953-stock-vector-no-image-available-icon-flat-vector.jpg?ver=6';

  constructor(private formBuilder: FormBuilder, private recipeService: RecipesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id: number = +this.route.snapshot.params['id'];
    if (id) {
      this.isEditModeOn = true;
      this.recipe = this.recipeService.fetchRecipe(id);
    }
    this.createRecipeForm();
  }

  createRecipeForm() {
    this.newRecipeForm = new FormGroup({
      recipeNameContainer: new FormGroup({ recipeName: new FormControl(this.isEditModeOn ? this.recipe.name : '', [Validators.required]) }),
      recipeDescriptionContainer: new FormGroup({ recipeDescription: new FormControl(this.isEditModeOn ? this.recipe.description : '') }),
      recipeImagePath: new FormGroup({ imagePath: new FormControl(this.isEditModeOn ? this.recipe.image_path : this.defaultImage) }),
      directionsArray: this.formBuilder.array(this.isEditModeOn ? this.createEditDirectionsFormGroup() : [this.createNewDirectionsFormGroup()]),
      ingredientsArray: this.formBuilder.array(this.isEditModeOn ? this.createEditIngredientsFormGroup() : [this.createNewIngredientsFormGroup()])
    });
  }

  createEditDirectionsFormGroup() {
    let formGroupArr: FormGroup[] = [];
    this.recipe.directions.forEach(step => {
      let formGroup = new FormGroup({});
      formGroup.addControl('direction', new FormControl(step, [Validators.required]));
      formGroupArr.push(formGroup);
    });

    return formGroupArr;
  }

  createEditIngredientsFormGroup() {
    let formGroupArr: FormGroup[] = [];
    this.recipe.ingredients.forEach(ingredient => {
      let formGroup = new FormGroup({});
      formGroup.addControl('newIngredient', new FormControl(ingredient, [Validators.required]));
      formGroupArr.push(formGroup);
    });

    return formGroupArr;
  }

  createNewDirectionsFormGroup() {
    return new FormGroup({
      direction: new FormControl('', [Validators.required])
    });
  }

  createNewIngredientsFormGroup() {
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
    let formGroup = this.createNewDirectionsFormGroup();
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

      let newRecipe: Recipe = new Recipe(recipeName, recipeDescription, imagePath, instructions, ingredients);

      if (this.isEditModeOn) {
        newRecipe.id = this.recipe.id;
        this.recipeService.updateRecipe(newRecipe);
        this.router.navigate(['recipes/' + this.recipe.id]);
      }
      else {
        this.recipeService.addRecipe(newRecipe);
        this.router.navigate(['recipes']);
      }
    }
  }
}
