import './styles.css'
import {GetStaticProps} from 'next';
import data from './data.json';


export class RecipeProps {
    public name!: string;
    public quantity?: number;
    public workstation?: string;
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
    return (
        <div className="recipe-with-ingredients">
            <div className="recipe flowchart-node">
                <h2>{renderQty}{props.name}</h2>
                {renderWorkstation}
            </div>
            {props.ingredients && renderIngredients(props.ingredients)}
        </div>
    )
}


export function RecipeSet(props: {recipeSets: RecipeSetProps[]}) {
    const render = props.recipeSets.map((r: RecipeSetProps, idx) => <div className="recipeset-container" key={idx}>
            <h1>{r.setName}</h1>
            {r.recipes.map((e, i) => <div key={i} className="app flex flex-wrap justify-around items-start flowchart-container">
                <Recipe key={i} {...e} />
            </div>)}
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
