import recipesDatabase from './recipes-database.json';
import displayConfig from './display-config.json';

export interface NormalizedRecipe {
  name: string;
  quantity?: number;
  workstation?: string;
  notes?: string;
  ingredients?: Array<{
    recipeId: string;
    quantityOverride?: number;
  } | string>;
}

export interface RecipeProps {
  name: string;
  quantity?: number;
  workstation?: string;
  notes?: string;
  ingredients?: RecipeProps[];
}

export interface RecipeSetProps {
  setName: string;
  recipes: RecipeProps[];
}

export class RecipeLoader {
  private recipes: Record<string, NormalizedRecipe>;
  private displayConfig: Record<string, string[]>;

  constructor() {
    this.recipes = recipesDatabase as Record<string, NormalizedRecipe>;
    this.displayConfig = displayConfig as Record<string, string[]>;
  }

  private resolveRecipe(recipeId: string, quantityOverride?: number): RecipeProps {
    const recipe = this.recipes[recipeId];
    if (!recipe) {
      throw new Error(`Recipe not found: ${recipeId}`);
    }

    const resolved: RecipeProps = {
      name: recipe.name,
      quantity: quantityOverride ?? recipe.quantity,
      workstation: recipe.workstation,
      notes: recipe.notes,
    };

    if (recipe.ingredients) {
      resolved.ingredients = recipe.ingredients.map(ingredient => {
        if (typeof ingredient === 'string') {
          return this.resolveRecipe(ingredient);
        } else {
          return this.resolveRecipe(ingredient.recipeId, ingredient.quantityOverride);
        }
      });
    }

    return resolved;
  }

  getRecipeSets(): RecipeSetProps[] {
    return Object.entries(this.displayConfig).map(([setName, recipeIds]) => ({
      setName,
      recipes: recipeIds.map(recipeId => this.resolveRecipe(recipeId))
    }));
  }
}