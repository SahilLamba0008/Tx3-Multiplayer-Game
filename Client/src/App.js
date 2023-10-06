import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicTacToe from './Components/otherComponents/tictactoe/TicTacToe';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      {/* <h1>TIC TAC TOE</h1> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/tictactoe' element={<TicTacToe />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
