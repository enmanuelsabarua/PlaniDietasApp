import './CSS/Account.css';
import diet from '../assets/data';
import { MealList } from '../components/MealList/MealList';

export const Account = () => {
    return (
        <div className='account'>
            <h2>Enmanuel Sanchez Abarúa</h2>
            <div className="objective">
                <h3>Objetivo</h3>
                <p>Aumentar de peso</p>
                <p>0.5 kg/semana</p>
            </div>
            <div className="diet">
                {diet.length ?
                    <>
                        <h3>Dieta</h3>
                        <MealList mealData={diet[0]} onlyRead={true} />
                    </>
                    :
                    <h3>(Aun no tienes una dieta agregada)</h3>
                }
            </div>
        </div>
    )
}
