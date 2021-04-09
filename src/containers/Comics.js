import { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const [resultSearch, setresultSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            // Appel des la liste des comics avec la fonctionnalité de recherche
            try {
                const response = await axios.get(
                    `https://marvel-backend-clemence.herokuapp.com/comics?title=${resultSearch}`
                );
                const comics = response.data.comics;
                // console.log(response.data.comics);

                setData(comics);
                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [resultSearch]);

    return isLoading ? (
        <div className="loading">
            <div>
                <strong>Page en cours de chargement...</strong>
            </div>
        </div>
    ) : (
        <div className="bg-white">
            <div className="comics">
                {/* Barre de recherche */}

                <div>
                    <input
                        type="search"
                        placeholder="Rechercher un comics"
                        onChange={(event) => {
                            setresultSearch(event.target.value);
                            console.log(resultSearch);
                        }}
                    />
                </div>

                {/* Liste des comics */}
                {data.results.map((comics, indexComics) => {
                    return (
                        <div key={comics._id} className="card">
                            <div>
                                <h1>{comics.title}</h1>

                                <img
                                    src={
                                        comics.thumbnail.path +
                                        "." +
                                        comics.thumbnail.extension
                                    }
                                    alt={comics.title}
                                />
                                <p>{comics.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Comics;
