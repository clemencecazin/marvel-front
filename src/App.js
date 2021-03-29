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
import {
    faHeart,
    faCaretRight,
    faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faCaretRight, faCaretLeft);

function App() {
    const [favorite, setFavorite] = useState(Cookies.get("fav") || null);

    // let favoritesCharacter = Cookies.get("charactersId") || null;

    // Garder le favoris en mémoire
    // const setFavCharacter = (fav) => {
    //     // Reçoit l'id quand on a cliqué sur favori
    //     const favs = Cookies.get("fav");
    //     Cookies.set("favorite", favs, { expires: 2000 });

    //     setFavorite(favs);
    // };
    return (
        <div className="bg">
            <Router>
                <Header />

                <Switch>
                    <Route path="/favorites">
                        <Favorites favorite={favorite} />
                    </Route>
                    <Route path="/characters">
                        <Characters />
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
