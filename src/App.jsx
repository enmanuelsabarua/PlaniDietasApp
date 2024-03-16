import { useState } from 'react';
import './App.css';
import { MealList } from './components/MealList/MealList';
import { NavBar } from './components/NavBar/NavBar';

function App() {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);

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

  return (
    <div className="App">
      <NavBar />
      <section className="controls">
        <input type="number" placeholder='Calorias (e.g. 2000)' onChange={handleChange} />
      </section>
      <button onClick={getMealData}>Obtener Plan Diario</button>
      {mealData && <MealList mealData={mealData} />}
    </div>
  )
}

export default App
