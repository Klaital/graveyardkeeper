'use client'

import React from 'react';
import {RecipeSet} from './Recipe';
import {RecipeLoader} from './recipe-loader';
import './styles.css';

export default function App() {
    const recipeLoader = new RecipeLoader();
    const recipeSets = recipeLoader.getRecipeSets();
    return (
        <>
            <RecipeSet recipeSets={recipeSets} />
        </>
    );
}