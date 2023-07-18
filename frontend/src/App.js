import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Main from './pages/Main/Main';
import Privacy from './pages/Privacy/Privacy';
import ThankYou from './pages/ThankYou/ThankYou';
import './App.css';
import './colors.css';

function App() {
    return (
        <Router>
            <Route path="/" exact>
                <Main />
            </Route>
            <Route path="/privacy" exact>
                <Privacy />
            </Route>
            <Route path="/thanks" exact>
                <ThankYou />
            </Route>
            <Redirect to="/" />
        </Router>
    );
};

export default App;