import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Comics from "./containers/Comics";
import Home from "./containers/Home";
import Characters from "./containers/Characters";
import CardCharacter from "./components/CardCharacter";
import Header from "./components/Header";

function App() {
    return (
        <div className="bg">
            <Router>
                <Header />

                <Switch>
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
