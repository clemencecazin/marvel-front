import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";

const Header = () => {
    return (
        <div className="menu">
            <Link to="/">
                <img src={logo} alt="" />
            </Link>
            <Link to="/characters">Personnages</Link>
            <Link to="/comics">Comics</Link>
            <Link to="/">Favoris</Link>
        </div>
    );
};

export default Header;
