import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

// import axios from "axios";

const Favorites = () => {
    const [data, setData] = useState();
    const [favorite, setFavorite] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (Cookies.get("fav")) {
            const favo = Cookies.get("fav");

            const productFavObj = JSON.parse(favo);

            setFavorite(productFavObj);

            console.log(productFavObj);
        }
    }, []);

    return (
        <div className="bg-white">
            {favorite.length === 0 ? (
                "Pas encore de favoris"
            ) : (
                <div className="comics">
                    {favorite.map((fav, indexCharacters) => {
                        // console.log(characters._id);

                        return fav.length !== 0 ? (
                            <div className="card" key={fav._id}>
                                <div>
                                    {/* Renvoyer l'ID du personnage en param */}
                                    <Link to={`/characterId/${fav._id}`}>
                                        <h1>{fav.name}</h1>
                                        {fav.thumbnail && (
                                            <img
                                                src={
                                                    fav.thumbnail.path +
                                                    "." +
                                                    fav.thumbnail.extension
                                                }
                                                alt={fav.name}
                                            />
                                        )}

                                        <p>{fav.description}</p>

                                        <div>En savoir +</div>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div>Vos personnages favoris</div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Favorites;
