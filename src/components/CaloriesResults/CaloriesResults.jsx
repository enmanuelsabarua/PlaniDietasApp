import './CaloriesResults.css';

export const CaloriesResults = ({ calories, activity }) => {
    if (activity === '1' && calories) {
        return (
            <div className='results'>
                <div className="row">
                    <div className='description'>
                        Tasa metabólica basal (TMB)
                    </div>
                    <div className='calories'>
                        <p>{new Intl.NumberFormat().format(calories)}</p>
                        <p>Calorías/dia</p>
                    </div>
                </div>
            </div>
        )
    } else if (calories) {
        return (
            <>
                <div className="maintain-weight">
                    <h3>(Selecciona tu objetivo)</h3>
                    <div className="row">
                        <div className='description'>
                            Mantener peso
                        </div>
                        <div className='calories'>
                            <p className='calorie'>{new Intl.NumberFormat().format(calories)} <span>100%</span></p>
                            <p>Calorías/dia</p>
                        </div>
                    </div>
                </div>

                <div className="result-column">
                    <div className='results'>
                        <h2>Cut/Definición</h2>
                        <div className="row">
                            <div className='description'>
                                Pérdida de peso leve
                                <p>0.25 kg/semana</p>
                            </div>
                            <div className='calories'>
                                <p className='calorie'>{new Intl.NumberFormat().format(calories - 250)} <span>{Math.round(((calories - 250) / calories) * 100)}%</span></p>
                                <p>Calorías/dia</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className='description'>
                                Perdida de peso
                                <p>0.5 kg/semana</p>
                            </div>
                            <div className='calories'>
                                <p className='calorie'>{new Intl.NumberFormat().format(calories - 500)} <span>{Math.round(((calories - 500) / calories) * 100)}%</span></p>
                                <p>Calorías/dia</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className='description'>
                                Perdida de peso extrema
                                <p>1 kg/semana</p>
                            </div>
                            <div className='calories'>
                                <p className='calorie'>{new Intl.NumberFormat().format(calories - 1000)} <span>{Math.round(((calories - 1000) / calories) * 100)}%</span></p>
                                <p>Calorías/dia</p>
                            </div>
                        </div>
                    </div>

                    <div className='results'>
                        <h2>Bulk/Volumen</h2>
                        <div className="row">
                            <div className='description'>
                                Aumento de peso leve
                                <p>0.25 kg/semana</p>
                            </div>
                            <div className='calories'>
                                <p className='calorie'>{new Intl.NumberFormat().format(+calories + 250)} <span>{Math.round(((+calories + 250) / +calories) * 100)}%</span></p>
                                <p>Calorías/dia</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className='description'>
                                Aumento de peso
                                <p>0.5 kg/semana</p>
                            </div>
                            <div className='calories'>
                                <p className='calorie'>{new Intl.NumberFormat().format(+calories + 500)} <span>{Math.round(((+calories + 500) / +calories) * 100)}%</span></p>
                                <p>Calorías/dia</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className='description'>
                                Aumento de peso rápido
                                <p>1 kg/semana</p>
                            </div>
                            <div className='calories'>
                                <p className='calorie'>{new Intl.NumberFormat().format(+calories + 1000)} <span>{Math.round(((+calories + 1000) / +calories) * 100)}%</span></p>
                                <p>Calorías/dia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return null;
}
