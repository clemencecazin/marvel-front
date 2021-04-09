import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const Login = ({ setUser }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();

        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://marvel-backend-clemence.herokuapp.com/user/login",
                    { email: email, password: password }
                );

                // If Token send back to Publish else send back to Home
                if (response.data.token) {
                    setUser(response.data.token);

                    history.push("/favorites");
                }
            } catch (error) {
                console.log(error);
                setErrorMessage(
                    <div>Le mail ou/et le mot de passe n'est pas correct</div>
                );
                if (error.response) {
                    console.log(error.response.message);
                }
            }
        };
        fetchData();
    };

    // Au clic on appelle l'API login on vérifie si me mdp et user sont valides, on enregistre le token retourné dans la fonction setUser
    // History permet de renvoyer vers la page sur laquelle on était

    return (
        <div className="signup-container">
            {/* Formulaire de connexion */}

            <h3>Se connecter</h3>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Adresse email"
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
                <div>{errorMessage}</div>

                <button type="submit">Se connecter</button>
            </form>
            <Link to="/Signup">
                Tu n'as pas encore de compte ? Inscris-toi !
            </Link>
        </div>
    );
};

export default Login;
