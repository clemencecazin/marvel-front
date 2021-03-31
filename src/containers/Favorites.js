import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import ListingCharacters from "../components/ListingCharacters";

// import axios from "axios";

const Favorites = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (Cookies.get("fav")) {
            const favo = Cookies.get("fav");

            const productFavObj = JSON.parse(favo);

            setData(productFavObj);

            console.log(productFavObj);
        }
    }, []);

    return (
        <div className="bg-white">
            {data.length === 0 ? (
                <div className="no-charac">
                    Vous n'avez pas encore de personnages en favoris
                </div>
            ) : (
                <div className="comics">
                    <ListingCharacters data={data} />
                </div>
            )}
        </div>
    );
};

export default Favorites;
