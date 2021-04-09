import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Comics from "./containers/Comics";
import Home from "./containers/Home";
import Characters from "./containers/Characters";
import CardCharacter from "./components/CardCharacter";
import Header from "./components/Header";
import Favorites from "./containers/Favorites";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHeart,
    faCaretRight,
    faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faCaretRight, faCaretLeft);

function App() {
    const [userToken, setUserToken] = useState(
        Cookies.get("userToken") || null
    );

    // Cookie ID
    const setUser = (token) => {
        if (token) {
            Cookies.set("userToken", token, { expires: 2 });
            // OnCLick, the cookie, is created with his expiration date
            setUserToken(token);
        } else {
            // If no token, we remove userToken to disconnect
            Cookies.remove("userToken");
            setUserToken(null);
        }
    };

    return (
        <div className="bg">
            <Router>
                <Header userToken={userToken} setUser={setUser} />

                <Switch>
                    <Route path="/login">
                        <Login setUser={setUser} />
                    </Route>
                    <Route path="/signup">
                        <Signup setUser={setUser} />
                    </Route>
                    <Route path="/favorites">
                        <Favorites userToken={userToken} />
                    </Route>
                    <Route path="/characters">
                        <Characters userToken={userToken} />
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
