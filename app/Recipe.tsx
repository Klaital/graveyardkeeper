import './styles.css'
import {GetStaticProps} from 'next';
import { useState } from 'react';
import data from './data.json';
import redSkull from './Red_Skull_Symbol.webp';
import whiteSkull from './White_Skull_Symbol.webp';
import Image from "next/image";

export class RecipeProps {
    public name!: string;
    public quantity?: number;
    public workstation?: string;
    public notes?: string;
    public ingredients?: RecipeProps[];
}

export class RecipeSetProps {
    public setName!: string;
    public recipes!: RecipeProps[];
}



export function Recipe(props: RecipeProps) {
    const renderIngredients = (ingredients: RecipeProps[]) => {
        return <div className="ingredients-container">
            {ingredients.map((ingredient, i) => (
            <div key={i} className="ingredient-row">
                <div className="flowchart-connector"></div>
                <Recipe {...ingredient} />
            </div>
        ))}
        </div>
    }
    const renderQty = (props.quantity) ? <span>{props.quantity}x </span> : <span></span>;
    const renderWorkstation = (props.workstation) ? <h2 className="text-sm">@{props.workstation} </h2> : <span></span>;
    const renderNotes = (props.notes) ? 
        <p className="text-xs">
            {props.notes.split('red').map((part, i) => 
                i === 0 ? part : [<Image key={i} src={redSkull} alt="red skull" className="inline-block w-4 h-4" />, part]
            )}
        </p> : <p></p>
    return (
        <div className="recipe-with-ingredients">
            <div className="recipe flowchart-node">
                <h2>{renderQty}{props.name}</h2>
                {renderWorkstation}
                {renderNotes}
            </div>
            {props.ingredients && renderIngredients(props.ingredients)}
        </div>
    )
}


export function RecipeSet(props: {recipeSets: RecipeSetProps[]}) {
    const [collapsedSets, setCollapsedSets] = useState<{[key: number]: boolean}>({});

    const toggleCollapse = (index: number) => {
        setCollapsedSets(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const render = props.recipeSets.map((r: RecipeSetProps, idx) => <div className="recipeset-container" key={idx}>
            <h1 className="collapsible-header" onClick={() => toggleCollapse(idx)}>
                <span className={`collapse-arrow ${collapsedSets[idx] ? 'collapsed' : 'expanded'}`}>▼</span>
                {r.setName}
            </h1>
            <div className={`recipeset-content ${collapsedSets[idx] ? 'collapsed' : 'expanded'}`}>
                {r.recipes.map((e, i) => <div key={i} className="app flex flex-wrap justify-around items-start flowchart-container">
                    <Recipe key={i} {...e} />
                </div>)}
            </div>
        </div>
    )

    return <>{render}</>
}

export async function getStaticProps() {
    // load the recipes from local file data.json
    // map the recipes into RecipeSetProps where the setName is the key, and the recipes is the value
    const recipeSets = Object.entries(data).map(([setName, recipes]: [string, RecipeProps[]]) => ({ setName, recipes }));
    return {props:{recipeSets}}
}
