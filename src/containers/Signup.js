import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Signup = ({ setUser }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage("");
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    "https://marvel-backend-clemence.herokuapp.com/user/signup",
                    {
                        username: username,
                        email: email,
                        password: password,
                    }
                    // Envoi des données à la base de données
                );

                if (response.data.token) {
                    // Si Token on le l'envoi à la fonction setUser
                    setUser(response.data.token);
                    // Redirection sur la page favoris après connexion
                    history.push("/favorites");
                }
            } catch (error) {
                console.log(error);
                setErrorMessage(
                    <div>Le formulaire n'est pas bien rempli !</div>
                );
                if (error.response) {
                    console.log(error.response.message);
                }
            }
        };
        fetchData();
    };

    return (
        <div className="signup-container">
            {/* Formulaire d'inscription */}
            <h3>S'inscrire</h3>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => {
                        setEmail(event.target.value);
                    }}
                />

                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />

                <button type="submit">S'inscrire</button>
                <div>{errorMessage}</div>
            </form>
            <Link to="/Login">Tu as déjà un compte ? Connecte-toi !</Link>
        </div>
    );
};

export default Signup;
