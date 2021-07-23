import Summary from "./components/Summary/Summary";
import { GlobalProvider } from "./context/GlobalState";

function App() {
  return (
    <GlobalProvider>
      <div className='cont-app'>
        <h1>My Budget Manager</h1>
        <Summary />
      </div>
    </GlobalProvider>
  );
}

export default App;
