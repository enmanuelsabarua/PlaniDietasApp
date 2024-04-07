import { useState } from 'react';
import './CalculatorForm.css';

export const CalculatorForm = ({ setCalories, activity, setActivity }) => {

  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');


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
          <input type="number" name='height' value={height} onChange={(e) => setHeight(e.target.value)} required min={10} />
        </label>

        <label className="weight">
          Peso (kg)
          <input type="number" name='weight' value={weight} onChange={(e) => setWeight(e.target.value)} required min={5} />
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
      <div className="calculator-info">
        <ul className='exercises-description'>
          <li><strong>Ejercicio:</strong> 15-30 minutos de actividad a frecuencia cardíaca elevada.</li>
          <li><strong>Ejercicio intenso:</strong> 45-120 minutos de actividad de frecuencia cardíaca elevada.</li>
          <li><strong>Ejercicio muy intenso:</strong> Más de 2 horas de actividad de frecuencia cardíaca elevada.</li>
        </ul>
        <div className="calculator-description">
          <p>Esta calculadora de calorías se basa una ecuación y los resultados se basan en un promedio estimado. La ecuación utilizada en esta calculadora es la de Harris-Benedict, fue una de las primeras ecuaciones utilizadas para calcular la tasa metabólica basal (TMB), que es la cantidad de energía gastada por día en reposo.</p>
          <h4>Ecuación de Mifflin-St Jeor:</h4>
          <p>Para hombres: TMB = 10W + 6.25H - 5A + 5</p>
          <p>Para mujeres: TMB = 10W + 6.25H - 5A - 161</p>
          <div className="equation-legend">
            <p>Donde:</p>
            <p>W es peso corporal en kg</p>
            <p>H es la altura en cm</p>
            <p>A es la edad</p>
          </div>

          <p>El valor obtenido de estas ecuaciones es el número estimado de calorías que una persona puede consumir en un día para mantener su peso corporal, suponiendo que permanezca en reposo. Este valor se multiplica por un factor de actividad (generalmente 1.2-1.95) que depende de los niveles típicos de ejercicio de una persona, que representa los momentos del día en que una persona no está en reposo.</p>
        </div>
      </div>
    </>
  )
}
