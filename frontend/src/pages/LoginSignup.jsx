import './CSS/LoginSignup.css';

export const LoginSignup = () => {
    return (
        <div className="loginsignup">
            <form className="loginsignup-container">
                <h1>Registro</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder="Tu nombre" required />
                    <input type="email" placeholder="Correo electrónico" required />
                    <input type="password" placeholder="Contraseña" required />
                </div>
                <button>Continuar</button>
                <p className="loginsignup-login">Ya tiene una cuenta? <span>Inicie sesión aquí</span></p>
                <div className="loginsignup-agree">
                    <label>
                        <input type="checkbox" name="" id="" required />
                        Al continuar, acepto los términos de uso y la política de privacidad.
                    </label>
                </div>
            </form>
        </div>
    )
}
