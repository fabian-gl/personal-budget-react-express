import { GlobalProvider } from "./context/GlobalState";
import Summary from "./components/Summary/Summary";
import NavBar from './components/NavBar/NavBar'

function App() {
  return (
    <GlobalProvider>
      <div className='cont-app'>
        <NavBar />
        <Summary />
      </div>
    </GlobalProvider>
  );
}

export default App;
