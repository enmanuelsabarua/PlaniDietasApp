import { Meal } from "./Meal"

export const MealList = ({ mealData }) => {
  const nutrients = mealData.nutrients;

  return (
    <main>
      <section className="nutrients">
        <h1>Macros</h1>
        <ul>
          <li>Calorías: {nutrients.calories.toFixed(0)}</li>
          <li>Carbohidratos: {nutrients.carbohydrates.toFixed(0)}</li>
          <li>Fat: {nutrients.fat.toFixed(0)}</li>
          <li>Protein: {nutrients.protein.toFixed(0)}</li>
        </ul>
      </section>

      <section className="meal">
        {mealData.meals.map(meal => <Meal key={meal.id} meal={meal} />)}
      </section>
    </main>
  )
}
