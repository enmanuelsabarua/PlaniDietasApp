import { Meal } from "../Meal/Meal"
import './MealList.css';
import dietService from '../../services/diets';
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth";

export const MealList = ({ mealData, setDiet, onlyRead = false, objetive }) => {
  const { nutrients } = mealData;

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const saveDiet = async data => {
    if (!user.name) {
      navigate('/login');
      return;
    }

    const token = window.localStorage.getItem('loggedUser') ? JSON.parse(window.localStorage.getItem('loggedUser')).token : null;
    dietService.setToken(token);


    try {
      const diet = await dietService.getOneByCalories(data.mealData.nutrients.calories);
      console.log('diet', diet);

      if (diet) {
        console.log('diet existed', data);
        const updatedUser = await authService.update(user.id, { objetive: { description: data.objetive.description, weight: data.objetive.weight }, diet: diet.id });
        setUser(updatedUser);
        setDiet(diet);
        navigate('/account');
      } else {
        console.log('diet did not exist', data);
        const newDiet = await dietService.create({ ...data.mealData, objetive: data.objetive, id: data.mealData.nutrients.calories });
        const updatedUser = await authService.getUser(user.id);

        // Test if the token remains on localStorage
        const token = window.localStorage.getItem('loggedUser') ? JSON.parse(window.localStorage.getItem('loggedUser')).token : null;
        localStorage.setItem('loggedUser', JSON.stringify({ ...updatedUser, token }));
        setUser(updatedUser);
        setDiet(newDiet);
        navigate('/account');
      }

    } catch (error) {
      console.error(`Couldn't save the diet: ${error}`);
    }
  }

  const removeDiet = async id => {
    try {
      const updatedUser = await authService.update(id, { objective: { description: null, weight: null }, diet: null });
      const token = window.localStorage.getItem('loggedUser') ? JSON.parse(window.localStorage.getItem('loggedUser')).token : null;
      window.localStorage.setItem('loggedUser', JSON.stringify({ ...updatedUser, token }));
      setUser(updatedUser);
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

      {!onlyRead ? <button className='diet-btn' onClick={() => saveDiet({ mealData, objetive })}>Guardar</button> : <button className='remove-diet-btn' onClick={() => removeDiet(user.id)}>Eliminar dieta</button>}

    </main>
  )
}
