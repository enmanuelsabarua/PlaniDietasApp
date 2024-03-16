import { useEffect, useState } from "react";
import './Meal.css';

export const Meal = ({ meal }) => {
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=7ee5a525aaef40808ebc28627d337369&includeNutrition=false`
        )
            .then(response => response.json())
            .then(data => setImageUrl(data.image))
            .catch(() => console.log("Error"))
    }, [meal.id]);



    return (
        <article className="meal">
            <h1>{meal.title}</h1>
            <img src={imageUrl} alt="Recipe" />
            <ul className="instructions">
                <li>Tiempo de preparación: {meal.readyInMinutes} minutes</li>
                <li>Numero de servicios: {meal.servings}</li>
            </ul>

            <a href={meal.sourceUrl}>Ir a la receta</a>
        </article>
    )
}
