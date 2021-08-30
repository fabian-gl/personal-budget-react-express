import { GlobalProvider } from "./context/GlobalState"

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import LoginAndRegistration from "./components/LoginAndRegistration/LoginAndRegistration"
import SummaryScreen from "./components/SummaryScreen/SummaryScreen"
import CRUDScreen from "./components/CRUDScreen/CRUDScreen"
import NavBar from './components/NavBar/NavBar'
import Alert from "./components/Alert/Alert"


function App() {

  return (
    <Router>
      <GlobalProvider>
        <div className='cont-app'>
          <NavBar />
          <Switch>
              <Route exact path='/' component={SummaryScreen} />
              <Route exact path='/crud' component={CRUDScreen} />
              <Route exact path='/login' component={LoginAndRegistration} />
          </Switch>
          <Alert />
        </div>
      </GlobalProvider>
    </Router>
  );
}

export default App;
