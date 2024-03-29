import './CSS/Account.css';
// import diet from '../assets/data';
import { MealList } from '../components/MealList/MealList';
import { useEffect } from 'react';
import dietService from '../services/diets';
import { useState } from 'react';

export const Account = ({ user, setUser }) => {
    const [diet, setDiet] = useState([]);

    useEffect(() => {
        dietService
            .getAll()
            .then(diet => setDiet(diet));
    }, []);

    return (
        <div className='account'>
            <h2>{user.name}</h2>
            {diet.length || user.description ?
                <>
                    <div className="objective">
                        <h3>Objetivo</h3>
                        <p>{user.objective.description}</p>
                        <p>{user.objective.weight}</p>
                    </div>
                    <div className="diet">
                        <h3>Dieta</h3>
                        <MealList mealData={diet[0]} diet={diet} setDiet={setDiet} onlyRead={true} />
                    </div>
                </>
                :
                <h3>(Aun no tienes una dieta agregada)</h3>
            }
        </div>
    )
}
