import { useState } from 'react';
import { MealList } from '../MealList/MealList';
import './CalculatorForm.css';

export const CalculatorForm = ({ calories, setCalories, activity, setActivity }) => {
  const [mealData, setMealData] = useState(null);

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');



  const handleChange = e => {
    setCalories(e.target.value);
  }

  const getMealData = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/mealplanner/generate?apiKey=7ee5a525aaef40808ebc28627d337369&timeFrame=day&targetCalories${calories}`
      );
      const data = await response.json();
      setMealData(data);
    } catch (error) {
      console.log("Error");
    }
  }

  const setGenderOnChange = e => {
    setGender(e.target.value);
  }

  const calculateCalories = (e) => {
    e.preventDefault();

    // Basal metabolic rate (Mifflin-St Jeor Equation)
    let BMR = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age));
    if (gender === 'male') {
      BMR += 5;
    } else {
      BMR -= 161;
    }

    switch (activity) {
      case '1.2':
        BMR *= 1.2;
        break;
      case '1.376':
        BMR *= 1.376;
        break;
      case '1.467':
        BMR *= 1.467;
        break;
      case '1.55':
        BMR *= 1.55;
        break;
      case '1.726':
        BMR *= 1.726;
        break;
      case '1.9':
        BMR *= 1.9;
        break;

      default:
        break;
    }

    setCalories(BMR.toFixed(0));
  }

  return (
    <>
      <form className="controls" onSubmit={calculateCalories}>
        <h2>Calcula tus calorías</h2>
        <label className="age">
          Edad
          <input type="number" name='age' value={age} onChange={(e) => setAge(e.target.value)} required min="15" max="80" />
          edades de entre 15 - 80
        </label>

        <div className="gender">
          <p>Genero</p>
          <label>
            <input type="radio" value="male" name="gender" onChange={setGenderOnChange} required />
            masculino
          </label>
          <label>
            <input type="radio" value="female" name="gender" onChange={setGenderOnChange} required />
            femenino
          </label>
        </div>

        <label className="height">
          Altura (cm)
          <input type="number" name='height' value={height} onChange={(e) => setHeight(e.target.value)} required />
        </label>

        <label className="weight">
          Peso (kg)
          <input type="number" name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </label>

        <label className="activity">
          Actividad
          <select name="actividad" value={activity} onChange={(e) => setActivity(e.target.value)} required>
            <option value="1">Tasa metabólica basal (TMB)</option>
            <option value="1.2">Sedentario: poco o no ejercicio</option>
            <option value="1.376">Liviano: ejercicio 1-3 veces/semana</option>
            <option value="1.467">Moderado: ejercicio 4-5 veces/semana</option>
            <option value="1.55">Activo: ejercicio diario o intenso 3-4 veces/semana</option>
            <option value="1.726">Muy activo: ejercicio intenso 6-7 veces/semana</option>
            <option value="1.9">Extra activo: ejercicio muy intenso a diario, o trabajo físico</option>
          </select>
        </label>

        <button type='submit'>Calcular calorías</button>
      </form>

      {/* <input type="number" placeholder='Calorias (e.g. 2000)' onChange={handleChange} /> */}

      <button className='diet-btn' onClick={getMealData}>Obtener Plan Diario</button>
      {mealData && <MealList mealData={mealData} />}
    </>
  )
}
