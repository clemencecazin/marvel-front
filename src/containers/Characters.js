import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Characters = ({ setFavCharacter }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [resultSearch, setresultSearch] = useState("");
    const [next, setNext] = useState();
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(100);

    const [iconStyle, setIconStyle] = useState("icon");
    let icon = false;
    let cookie = Cookies.get("fav");
    const [favorite, setFavorite] = useState(
        (cookie && JSON.parse(cookie)) || [[], []]
    );

    // const [tabId, setTabId] = useState([]);

    useEffect(() => {
        const fetchData = async (event) => {
            // Définit le nombre de résultat que l'on veut sur la page
            try {
                const response = await axios.get(
                    `https://marvel-backend-clemence.herokuapp.com/characters/?name=${resultSearch}&skip=${skip}&limit=${limit}`
                );

                console.log(response.data);
                setNext(response.data.characters.count);
                // Assigne la query limit pour lier au back
                const characters = response.data.characters.results;
                // console.log(characters);

                // Adding Fav icon in every objects
                for (let i = 0; i < characters.length; i++) {
                    characters[i].icon = false;
                    // console.log(characters[i]);
                }
                setData(characters);

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [resultSearch, skip]);

    const addFavorites = (fav) => {
        // Reçoit l'objet mis en favori quand on a cliqué

        console.log("fav");

        fav.icon = true;

        const newTabFav = [...favorite];

        console.log(newTabFav);

        const exist = newTabFav.find((elem) => elem._id === fav._id);

        if (!exist) {
            newTabFav.push(fav);
            alert("Favoris ajouté !");
        } else {
            alert("Caractère déjà en favoris !");
        }

        Cookies.set("fav", JSON.stringify(newTabFav), {
            expires: 2000,
        });
    };

    const handleCheck = (icon) => {
        if (icon) {
            return <FontAwesomeIcon className="red" icon="heart" />;
        } else {
            return <FontAwesomeIcon className={iconStyle} icon="heart" />;
        }
    };

    const nextPage = () => {
        console.log(next);
        console.log(page);
        console.log(resultSearch.length);
        console.log(skip);

        console.log(data);

        if (page * limit < next) {
            setPage(page + 1);
            let newSkip = skip + limit;
            setSkip(newSkip);
        }
    };

    const previousPage = () => {
        if (page * limit < next) {
            setPage(page - 1);
            let newSkip = skip - limit;
            setSkip(newSkip);
        }
    };

    return isLoading ? (
        <div className="loading">
            <div>
                <strong>Page en cours de chargement...</strong>
            </div>
        </div>
    ) : (
        <div className="bg-white">
            <div className="next-previous">
                {page > 1 && (
                    <button
                        onClick={() => {
                            previousPage();
                        }}
                    >
                        <div>
                            <FontAwesomeIcon
                                className={iconStyle}
                                icon="caret-left"
                            />
                            Page précédente
                        </div>
                    </button>
                )}

                <button
                    onClick={() => {
                        nextPage();
                    }}
                >
                    <div>
                        Page suivante
                        <FontAwesomeIcon
                            className={iconStyle}
                            icon="caret-right"
                        />
                    </div>
                </button>
            </div>
            <div className="comics">
                <div>
                    <input
                        type="search"
                        placeholder="Rechercher un personnage"
                        onChange={(event) => {
                            setresultSearch(event.target.value);
                            console.log(resultSearch);
                        }}
                    />
                </div>

                {data.map((characters, indexCharacters) => {
                    // console.log(characters._id);

                    return (
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
                                <span
                                    onClick={(event) => {
                                        addFavorites(characters);
                                        characters.icon = true;
                                    }}
                                >
                                    {handleCheck(characters.icon)}
                                    {/* AU CLIC on appelle une fonction qui a commen argument l'id du character et on l'envoi en event */}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Characters;
