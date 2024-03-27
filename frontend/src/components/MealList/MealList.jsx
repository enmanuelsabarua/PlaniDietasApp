import { Meal } from "../Meal/Meal"
import './MealList.css';
import dietService from '../../services/diets';

export const MealList = ({ mealData, setDiet, onlyRead = false }) => {
  const { nutrients } = mealData;

  const saveDiet = async data => {
    try {
      const diets = await dietService.getAll();

      if (diets.length) {
        await dietService.update(diets[0].id, data);
      } else {
        await dietService.create(data);
      }
    } catch (error) {
      console.error(`Couldn't save the diet: ${error}`);
    }
  }

  const removeDiet = async id => {
    try {
      await dietService.remove(id);
      setDiet([]);
    } catch (error) {
      console.error(`Couldn't remove the diet: ${error}`)
    }
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

      {!onlyRead ? <button className='diet-btn' onClick={() => saveDiet(mealData)}>Guardar</button> : <button className='remove-diet-btn' onClick={() => removeDiet(mealData.id)}>Eliminar dieta</button>}

    </main>
  )
}
