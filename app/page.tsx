'use client'

import React from 'react';
import recipes from './data.json';
import {RecipeProps, RecipeSet} from './Recipe';
import './styles.css';

export default function App() {
    const recipeSets = Object.entries(recipes).map(([setName, recipes]: [string, RecipeProps[]]) => ({ setName, recipes }));
    return (
        <>
            <RecipeSet recipeSets={recipeSets} />
        </>
    );
}