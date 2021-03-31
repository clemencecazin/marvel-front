import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import ListingCharacters from "../components/ListingCharacters";

const Characters = ({ setFavCharacter }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [resultSearch, setresultSearch] = useState("");
    const [next, setNext] = useState();
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const limit = 100;

    const [iconStyle, setIconStyle] = useState("icon");
    let icon = false;
    let cookie = Cookies.get("fav");
    const [favorite, setFavorite] = useState(
        (cookie && JSON.parse(cookie)) || [[]]
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
        console.log("data");

        console.log(data);
        console.log("fav");

        const newTabFav = [...favorite];

        console.log(newTabFav);

        const exist = newTabFav.find((elem) => elem._id === fav._id);

        if (!exist) {
            newTabFav.push(fav);
            alert("Personnage ajouté aux favoris  !");
            data.icon = true;
            fav.icon = true;
        } else {
            alert("Ce personnage est déjà dans vos favoris !");
        }

        Cookies.set("fav", JSON.stringify(newTabFav), {
            expires: 2000,
        });
    };

    const handleCheck = (icon) => {
        console.log(data.icon);

        if (data.icon) {
            return <FontAwesomeIcon className="red" icon="heart" />;
        } else {
            return <FontAwesomeIcon className={iconStyle} icon="heart" />;
        }
    };

    const nextPage = () => {
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

                <ListingCharacters data={data} addFavorites={addFavorites} />
            </div>
        </div>
    );
};

export default Characters;
