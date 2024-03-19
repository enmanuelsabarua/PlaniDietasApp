import { Meal } from "../Meal/Meal"
import './MealList.css';

export const MealList = ({ mealData }) => {
  const nutrients = mealData.nutrients;

  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calorías: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohidratos: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Grasa: {nutrients.fat.toFixed(0)}</li>
          <li>Proteína: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meals">
        {mealData.meals.map(meal => <Meal key={meal.id} meal={meal} />)}
      </section>

      <button className='diet-btn'>Guardar</button>
    </main>
  )
}
