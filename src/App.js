import logo from './logo.svg';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Homepage from './components/homepage'

function App() {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
