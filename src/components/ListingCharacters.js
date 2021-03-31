import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListingCharacters = ({ data, addFavorites }) => {
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

                                    {/* AU CLIC on appelle une fonction qui a commen argument l'id du character et on l'envoi en event */}
                                </span>
                            ) : (
                                ""
                            )}
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
