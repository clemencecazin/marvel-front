import { useState, useEffect } from "react";
import axios from "axios";

const Favorites = ({ charactersId }) => {
    const [data, setData] = useState();
    // useEffect(() => {
    //     const fetchData = async (event) => {
    //         try {
    //             const response = await axios.get(
    //                 `http://localhost:3001/charactersFav/`
    //             );
    //         } catch (error) {
    //             console.log(error.message);
    //         }
    //     };
    //     fetchData();
    // });

    return <div className="bg-white">{charactersId}</div>;
};

export default Favorites;
