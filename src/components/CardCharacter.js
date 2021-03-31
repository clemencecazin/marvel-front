import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CardCharacter = () => {
    // Récupérer l'ID du param
    const { characterId } = useParams();
    // console.log(characterId);

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://marvel-backend-clemence.herokuapp.com/comics/${characterId}`
                );

                // Apppelle le param
                // Résultat de la requête selon l'Id du perso

                const character = response.data.characters;
                console.log(character);

                setData(character);

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [setData, characterId]);

    return isLoading ? (
        <div className="loading">
            <div>
                <strong>Page en cours de chargement...</strong>
            </div>
        </div>
    ) : (
        <div className="bg-white">
            <div className="perso">
                <div>
                    <img
                        src={
                            data.thumbnail.path + "." + data.thumbnail.extension
                        }
                        alt=""
                    />

                    <h2>
                        Comics <br />
                        {data.name}
                    </h2>
                </div>

                {data.comics.length === 0 ? (
                    <div className="no-charac">
                        Pas de comics associés à ce personnage pour le moment
                    </div>
                ) : (
                    <div>
                        {data.comics.map((comics, indexCardComics) => {
                            return (
                                <div key={indexCardComics}>
                                    <h3>{comics.title}</h3>
                                    <p>{comics.description}</p>
                                    <img
                                        src={
                                            comics.thumbnail.path +
                                            "." +
                                            comics.thumbnail.extension
                                        }
                                        alt=""
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardCharacter;
