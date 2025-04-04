import RoutesApp from "./routes";
import {ToastContainer} from 'react-toastify'

function App() {
  return (
    <div className="App">
      <ToastContainer 
      autoClose={4000}
      position="bottom-right"
      theme="colored"
      />
      <RoutesApp/>
    
    </div>
  );
}

export default App;
