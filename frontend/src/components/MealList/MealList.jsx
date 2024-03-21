import { Meal } from "../Meal/Meal"
import './MealList.css';
import diet from "../../assets/data";

export const MealList = ({ mealData, onlyRead = false }) => {
  const nutrients = mealData.nutrients;

  const saveDiet = data => {
    // eslint-disable-next-line no-import-assign
    diet.push(data);
  }

  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calorías: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohidratos: {nutrients.carbohydrates.toFixed(0)}g</li>
          <li>Grasa: {nutrients.fat.toFixed(0)}g</li>
          <li>Proteína: {nutrients.protein.toFixed(0)}g</li>
        </ul>
      </section>

      <section className="meals">
        {mealData.meals.map(meal => <Meal key={meal.id} meal={meal} />)}
      </section>

      {!onlyRead && <button className='diet-btn' onClick={() => saveDiet(mealData)}>Guardar</button>}
    </main>
  )
}
