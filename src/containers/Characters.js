import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/characters"
                );
                const characters = response.data.characters;
                // console.log(response.data.characters);

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
            {data.results.map((characters, index) => {
                // console.log(characters._id);

                return (
                    <div key={characters._id}>
                        {/* Renvoyer l'ID du personnage en param */}
                        <Link to={`/characterId/${characters._id}`}>
                            {characters.name}
                            <img
                                src={
                                    characters.thumbnail.path +
                                    "." +
                                    characters.thumbnail.extension
                                }
                                alt={characters.name}
                            />

                            {characters.description}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Characters;
