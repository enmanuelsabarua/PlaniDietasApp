import { useState } from "react";

export const Meal = ({ meal }) => {
    const [imageUrl, setImageUrl] = useState("");


    return (
        <article>
            <h1>{meal.title}</h1>
            <img src={imageUrl} alt="Recipe" />
            <ul>
                <li>Tiempo de preparación: {meal.readyInMinutes} minutes</li>
                <li>Numero de servicios: {meal.servings}</li>
            </ul>

            <a href={meal.sourceUrl}>Ir a la receta</a>
        </article>
    )
}
