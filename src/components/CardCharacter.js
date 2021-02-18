import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CardCharacter = () => {
    const { characterId } = useParams();
    // console.log(characterId);

    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/comics/${characterId}`
                );

                const character = response.data.characters;
                // console.log(character);

                setData(character);

                setIsLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [setData, characterId]);

    return isLoading ? (
        <p>En cours de chargement...</p>
    ) : (
        <div className="bg-white">
            {console.log(data)}

            <img
                src={data.thumbnail.path + "." + data.thumbnail.extension}
                alt=""
            />

            {data.name}

            <div>
                {data.comics.map((comics, indexCardComics) => {
                    return (
                        <div key={comics.title}>
                            {comics.title}
                            {comics.description}
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
        </div>
    );
};

export default CardCharacter;
