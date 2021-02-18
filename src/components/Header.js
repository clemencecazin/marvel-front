import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="menu">
            <Link to="/characters">Personnages</Link>
            <Link to="/comics">Comics</Link>
            <Link to="/">Favoris</Link>
        </div>
    );
};

export default Header;
