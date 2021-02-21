import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Comics from "./containers/Comics";
import Home from "./containers/Home";
import Characters from "./containers/Characters";
import CardCharacter from "./components/CardCharacter";
import Header from "./components/Header";
import Favorites from "./containers/Favorites";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
    const [charactersId, setCharactersId] = useState(
        Cookies.get("charactersId") || null
    );

    // let favoritesCharacter = Cookies.get("charactersId") || null;

    // Garder le favoris en mémoire
    const setCharacter = (id) => {
        // Reçoit l'id quand on a cliqué sur favori
        Cookies.set("charactersId", id, { expires: 2000 });
        setCharactersId(id);
        console.log(charactersId);
        // // console.log(tab);
        // for (let i = 0; i < favoritesCharacter.length; i++) {
        //     console.log(favoritesCharacter[i]);
        //     favoritesCharacter = favoritesCharacter + favoritesCharacter[i];
        //     // console.log(tab);
        // }
    };
    return (
        <div className="bg">
            <Router>
                <Header />

                <Switch>
                    <Route path="/favorites">
                        <Favorites charactersId={charactersId} />
                    </Route>
                    <Route path="/characters">
                        <Characters setCharacter={setCharacter} />
                    </Route>
                    <Route path="/characterId/:characterId">
                        <CardCharacter />
                    </Route>
                    <Route path="/comics">
                        <Comics />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
