import { BrowserRouter, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';
import './Homepage.scss';
import MemeEditor from '../CreateMemePage/MemeEditor';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="Header">
          <Header />
        </div>
        <MemePage />
        <Footer />
        <MemeEditor />
      </div>
    </BrowserRouter>
  );
}

export default App;
