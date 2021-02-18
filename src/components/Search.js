import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ data, setData }) => {
    const [resultSearch, setresultSearch] = useState();

    const search = (event) => {
        const input = event.target.value; // Nouvelle variable pour stocker ce que je tape dans search
        console.log(event.target.value);
        setresultSearch(input); // Assigne le résultat à la state
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/comics/search/?title=${resultSearch}`
                );

                setData(response.data);

                console.log(response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, [resultSearch, setData]);

    return (
        <div>
            <input type="search" placeholder="Rechercher" onChange={search} />
        </div>
    );
};

export default Search;
