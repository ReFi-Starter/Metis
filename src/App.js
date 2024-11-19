
import { Toaster } from 'react-hot-toast';
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
       <Toaster />
     <LandingPage/>
    </div>
  );
}

export default App;
