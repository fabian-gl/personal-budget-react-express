import { GlobalProvider } from "./context/GlobalState";
import SummaryScreen from "./components/SummaryScreen/SummaryScreen";
import NavBar from './components/NavBar/NavBar'
import CRUDScreen from "./components/CRUDScreen/CRUDScreen";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Alert from "./components/Alert/Alert";


function App() {
  return (
    <Router>
      <GlobalProvider>
        <div className='cont-app'>
          <NavBar />
          <Switch>
            <Route exact path='/' component={SummaryScreen} />
            <Route exact path='/crud' component={CRUDScreen} />
          </Switch>
          <Alert />
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
