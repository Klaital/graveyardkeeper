import './styles.css'
import { useState } from 'react';
import redSkull from './Red_Skull_Symbol.webp';
import whiteSkull from './White_Skull_Symbol.webp';
import Image from "next/image";
import { RecipeProps, RecipeSetProps } from './recipe-loader';



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
            {props.notes.split(/\b(red|white)\b/g).map((part, i) => {
                if (part === 'red') return <Image key={i} src={redSkull} alt="red skull" className="inline-block w-4 h-4" />;
                if (part === 'white') return <Image key={i} src={whiteSkull} alt="white skull" className="inline-block w-4 h-4" />;
                return part;
            })}
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

