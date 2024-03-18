import { useState } from 'react';
import { CalculatorForm } from '../components/CalculatorForm/CalculatorForm';
import { CaloriesResults } from '../components/CaloriesResults/CaloriesResults';
import './CSS/Calculator.css';

export const Calculator = () => {
    const [calories, setCalories] = useState(0);
    const [activity, setActivity] = useState('1');
    return (
        <div className="calculator">
            <CaloriesResults calories={calories} activity={activity} />
            <CalculatorForm calories={calories} setCalories={setCalories} activity={activity} setActivity={setActivity} />
        </div>
    )
}
