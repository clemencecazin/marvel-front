import { useState, useEffect } from "react";
import axios from "axios";
import ListingCharacters from "../components/ListingCharacters";
import NextPreviousPage from "../components/NextPreviousPage";

const Characters = ({ userToken }) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [resultSearch, setresultSearch] = useState("");
    const [counter, setCounter] = useState();
    const [page, setPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const limit = 100;

    // let icon = false;

    useEffect(() => {
        const fetchData = async (event) => {
            // Appel la liste des personnages
            // Définit le nombre de résultat que l'on veut sur la page
            try {
                const response = await axios.get(
                    `https://marvel-backend-clemence.herokuapp.com/characters/?name=${resultSearch}&skip=${skip}&limit=${limit}`
                );

                console.log(response.data);
                setCounter(response.data.characters.count);
                const characters = response.data.characters.results;
                // console.log(characters);

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

    // const handleCheck = (icon) => {
    //     console.log(data.icon);

    //     if (data.icon) {
    //         return <FontAwesomeIcon className="red" icon="heart" />;
    //     } else {
    //         return <FontAwesomeIcon className={iconStyle} icon="heart" />;
    //     }
    // };

    return isLoading ? (
        <div className="loading">
            <div>
                <strong>Page en cours de chargement...</strong>
            </div>
        </div>
    ) : (
        <div className="bg-white">
            {/* Bouton Précédent et Next */}

            <NextPreviousPage
                counter={counter}
                page={page}
                setPage={setPage}
                limit={limit}
                setSkip={setSkip}
                skip={skip}
            />

            {/* Barre de recherche */}
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

                {/* Liste des personnages */}
                <ListingCharacters
                    data={data}
                    userToken={userToken}
                    setDate={setData}
                />
            </div>
        </div>
    );
};

export default Characters;
