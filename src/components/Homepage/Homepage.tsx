import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MemePage from '../MemePage/MemePage';
import './Homepage.scss';
import MemeEditor from '../CreateMemePage/MemeEditor';
import CreateMemePage from '../CreateMemePage/CreateMemePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-meme" element={<CreateMemePage />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <Header />
      <MemePage />
      <Footer />
    </>
  );
}

export default App;
