import './CSS/Account.css';
import { MealList } from '../components/MealList/MealList';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
// import authService from '../services/auth';
import dietsService from '../services/diets';


export const Account = () => {
    const { user, diet, setDiet } = useContext(UserContext);

    // Las dietas del usuario no se están cargando
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
            if (user.diet) {
                dietsService.getOne(user.diet.id)
                    .then((fetchedDiet) => { setDiet(fetchedDiet); console.log(user); });
            }
        }
    }, []);

    return (
        <div className='account'>
            <h2>{user.name}</h2>
            {user.objective && diet.nutrients ?
                <>
                    <div className="objective">
                        <h3>Objetivo</h3>
                        <p>{user.objective.description}</p>
                        <p>{user.objective.weight}</p>
                    </div>
                    <div className="diet">
                        <h3>Dieta</h3>
                        <MealList mealData={diet} setDiet={setDiet} onlyRead={true} />
                    </div>
                </>
                :
                <h3>(Aun no tienes una dieta agregada)</h3>
            }
        </div>
    )
}
