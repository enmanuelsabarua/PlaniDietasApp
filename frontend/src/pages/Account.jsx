import './CSS/Account.css';
import { MealList } from '../components/MealList/MealList';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';


export const Account = () => {
    const [diet, setDiet] = useState([]);

    const { user } = useContext(UserContext);

    return (
        <div className='account'>
            <h2>{user.name}</h2>
            {diet.length && user.description ?
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
