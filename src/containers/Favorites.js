import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import ListingCharacters from "../components/ListingCharacters";

// import axios from "axios";

const Favorites = ({ userToken }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (Cookies.get("fav")) {
            // Get pour Afficher les favoris

            const favo = Cookies.get("fav");

            const productFavObj = JSON.parse(favo);

            if (productFavObj) setData(productFavObj);

            console.log(data);
        }
    }, []);

    return (
        <div className="bg-white">
            {/* Si pas de userToken, demande de connexion */}

            {/* Si userToken affiche la liste des favoris */}

            {!userToken ? (
                <>
                    <div className="no-login">
                        <div>
                            Connectez-vous ou créez un compte pour accéder à vos
                            favoris
                        </div>
                        <div>
                            <Link to="/Login">Se connecter</Link>
                            <Link to="/Signup">S'inscrire</Link>
                        </div>
                    </div>
                </>
            ) : data.length === 0 ? (
                <div className="no-charac">
                    Vous n'avez pas encore de personnages en favoris
                </div>
            ) : (
                <div className="comics">
                    <ListingCharacters data={data} />
                </div>
            )}
        </div>
    );
};

export default Favorites;
