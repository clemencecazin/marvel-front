import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const Header = ({ setUser, userToken }) => {
    return (
        <div className="menu">
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
            <Link to="/characters">Personnages</Link>
            <Link to="/comics">Comics</Link>
            <Link to="/favorites">Favoris</Link>
            {!userToken ? (
                <div>
                    <Link to="/login">Se connecter</Link>
                    <Link to="/signup">S'inscrire</Link>
                </div>
            ) : (
                <button className="signout" onClick={() => setUser(null)}>
                    Se déconnecter
                </button>
            )}
        </div>
    );
};

export default Header;
