import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ setCharacter }) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [resultSearch, setresultSearch] = useState("");
    const [iconStyle, setIconStyle] = useState("icon");
    // const [tabId, setTabId] = useState([]);

    useEffect(() => {
        const fetchData = async (event) => {
            const limit = 100;
            const skip = 0;

            // Définit le nombre de résultat que l'on veut sur la page
            try {
                const response = await axios.get(
                    `https://marvel-backend-clemence.herokuapp.com/characters/?name=${resultSearch}&skip=${skip}&limit=${limit}`
                );
                // Assigne la query limit pour lier au back
                const characters = response.data.characters;
                console.log(response.data.characters);

                setData(characters);

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [resultSearch]);

    const favorites = (event) => {
        setCharacter(event);
        console.log(event);
    };

    const handleCheck = (event) => {
        // console.log(event);

        // const newTab = [...tabId];
        setIconStyle("red");

        // for (let i = 0; i < newTab.length; i++) {
        //     if (newTab[i].event === event) {
        //         newTab[i].check = !newTab[i].check;
        //     }
        // }
        // setTabId(newTab);
    };

    return isLoading ? (
        <div className="loading">
            <div>
                <strong>Page en cours de chargement...</strong>
            </div>
        </div>
    ) : (
        <div className="bg-white">
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
                {data.results.map((characters, indexCharacters) => {
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
                                        favorites(characters._id);
                                    }}
                                >
                                    {/* AU CLIC on appelle une fonction qui a commen argument l'id du character et on l'envoi en event */}

                                    <FontAwesomeIcon
                                        onClick={(event) =>
                                            handleCheck(characters._id)
                                        }
                                        className={iconStyle}
                                        icon="heart"
                                    />
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
