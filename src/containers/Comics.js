import { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/comics"
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
    }, []);

    return isLoading ? (
        <p>En cours de chargement...</p>
    ) : (
        <div className="bg-white">
            {data.results.map((comics, indexComics) => {
                // console.log(comics.title);
                return (
                    <div key={comics._id}>
                        {comics.title}
                        <img
                            src={
                                comics.thumbnail.path +
                                "." +
                                comics.thumbnail.extension
                            }
                            alt={comics.title}
                        />

                        {comics.description}
                    </div>
                );
            })}
        </div>
    );
};

export default Comics;
