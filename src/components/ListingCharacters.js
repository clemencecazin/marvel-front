import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useState } from "react";

const ListingCharacters = ({ data, userToken }) => {
    let cookie = Cookies.get("fav");
    const [favorite, setFavorite] = useState(
        (cookie && JSON.parse(cookie)) || [[]]
    );

    const addFavorites = (fav) => {
        // Reçoit l'objet mis en favori quand on a cliqué

        // Copie
        const newTabFav = [...favorite];

        const exist = newTabFav.find((elem) => elem._id === fav._id);
        if (userToken) {
            if (!exist) {
                // Si le personnage n'est pas encore dans les favoris

                newTabFav.push(fav);
                alert("Personnage ajouté aux favoris  !");
                data.icon = true;
                fav.icon = true;
            } else {
                alert("Ce personnage est déjà dans vos favoris !");
            }
        } else {
            alert("Créez un compte pour ajouter aux favoris");
        }

        Cookies.set("fav", JSON.stringify(newTabFav), {
            expires: 2000,
        });
    };

    return (
        <>
            {data.map((characters, indexCharacters) => {
                // console.log(characters._id);

                return characters.length !== 0 ? (
                    <div className="card" key={characters._id}>
                        <div>
                            {/* Renvoyer l'ID du personnage en param */}
                            <Link to={`/characterId/${characters._id}`}>
                                <h1>{characters.name}</h1>
                                <img
                                    src={
                                        characters.thumbnail.path +
                                        "." +
                                        characters.thumbnail.extension
                                    }
                                    alt={characters.name}
                                />
                                <p>{characters.description}</p>
                                <div>En savoir +</div>
                            </Link>

                            {/* Si on est sur la page Personnage on fait apparaitre le coeur pour favoris */}
                            {data[0].length !== 0 ? (
                                <span
                                    onClick={(event) => {
                                        addFavorites(characters);
                                        characters.icon = true;
                                    }}
                                >
                                    <FontAwesomeIcon
                                        style={{
                                            color: characters.icon
                                                ? "red"
                                                : "black",
                                        }}
                                        icon="heart"
                                    />
                                </span>
                            ) : (
                                ""
                            )}
                            {/* Si on est sur la page favoris on ne fait pas apparaitre le coeur */}
                        </div>
                    </div>
                ) : (
                    <div className="fav">Vos personnages favoris</div>
                );
            })}
        </>
    );
};

export default ListingCharacters;
