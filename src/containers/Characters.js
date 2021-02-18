import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (event) => {
            const limit = 100;
            const skip = 0;

            // Définit le nombre de résultat que l'on veut sur la page
            try {
                const response = await axios.get(
                    `http://localhost:3001/characters/?skip=${skip}&limit=${limit}`
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
    }, [setData]);

    return isLoading ? (
        <p>En cours de chargement...</p>
    ) : (
        <div className="bg-white">
            <div className="comics">
                {data.results.map((characters, index) => {
                    // console.log(characters._id);

                    return (
                        <div>
                            <div key={characters._id}>
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
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Characters;
